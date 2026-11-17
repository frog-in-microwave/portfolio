import os
import json
import asyncio
import base64
import urllib.request
import subprocess
import time
import tempfile
import websockets
from PIL import Image as PILImage, ImageDraw, ImageFont
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib import colors
from reportlab.pdfgen import canvas

async def capture_screenshots():
    temp_dir = tempfile.mkdtemp()
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    cmd = [chrome_path, '--headless=new', '--remote-debugging-port=9230', f'--user-data-dir={temp_dir}', '--window-size=1600,1000']
    proc = subprocess.Popen(cmd)
    await asyncio.sleep(2)

    try:
        req = urllib.request.Request('http://localhost:9230/json/new?http://localhost:3000/projects/edubrave-learning-portal', method='PUT')
        target = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        ws_url = target['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url) as ws:
            await asyncio.sleep(2.5)
            msg = {'id': 1, 'method': 'Page.captureScreenshot', 'params': {'format': 'png', 'captureBeyondViewport': True}}
            await ws.send(json.dumps(msg))
            resp = json.loads(await ws.recv())
            data = base64.b64decode(resp['result']['data'])
            with open('full_1600.png', 'wb') as f:
                f.write(data)
            print("Captured new full_1600.png")

        # Also capture homepage card
        req2 = urllib.request.Request('http://localhost:9230/json/new?http://localhost:3000/#projects', method='PUT')
        target2 = json.loads(urllib.request.urlopen(req2).read().decode('utf-8'))
        ws_url2 = target2['webSocketDebuggerUrl']
        async with websockets.connect(ws_url2) as ws2:
            await asyncio.sleep(2.5)
            eval_script = '''(() => {
                const card = document.querySelector('#projects .snap-start');
                if (!card) return null;
                const r = card.getBoundingClientRect();
                return {x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height};
            })()'''
            await ws2.send(json.dumps({'id': 2, 'method': 'Runtime.evaluate', 'params': {'expression': eval_script, 'returnByValue': True}}))
            resp2 = json.loads(await ws2.recv())
            card_rect = resp2['result']['result']['value']
            if card_rect:
                msg_clip = {'id': 3, 'method': 'Page.captureScreenshot', 'params': {'format': 'png', 'clip': {'x': card_rect['x'] - 20, 'y': card_rect['y'] - 20, 'width': card_rect['w'] + 40, 'height': card_rect['h'] + 40, 'scale': 1.5}}}
                await ws2.send(json.dumps(msg_clip))
                resp3 = json.loads(await ws2.recv())
                with open('project_card.png', 'wb') as f:
                    f.write(base64.b64decode(resp3['result']['data']))
                print("Captured project_card.png")
    finally:
        proc.terminate()

def slice_and_annotate():
    img = PILImage.open('full_1600.png')
    w, h = img.size

    # Crop Section 1: Header + Media + Action buttons + Mobile-optimized Metrics (y: 0 to 1250)
    s1 = img.crop((240, 0, 1340, 1250))
    s1.save('pdf_s1_header_media.png')

    # Crop Section 2: Narrative Core (Overview, Problem, Solution, Highlights, Features, Sidebar)
    s2 = img.crop((240, 1250, 1340, min(h, 2450)))
    s2.save('pdf_s2_deepdive.png')

    # Crop Section 3: Extra media gallery if available
    s3 = img.crop((240, 750, 1340, 1550))
    s3.save('pdf_s3_gallery.png')

    try:
        font_large = ImageFont.truetype("arialbd.ttf", 22)
        font_mid = ImageFont.truetype("arialbd.ttf", 18)
        font_mono = ImageFont.truetype("consola.ttf", 16)
    except:
        font_large = font_mid = font_mono = ImageFont.load_default()

    # Annotate Section 1
    im1 = PILImage.open('pdf_s1_header_media.png').convert('RGBA')
    overlay1 = PILImage.new('RGBA', im1.size, (0, 0, 0, 0))
    d1 = ImageDraw.Draw(overlay1)

    # 1. Breadcrumbs
    d1.rectangle([50, 115, 380, 155], outline=(245, 158, 11, 255), width=3, fill=(245, 158, 11, 40))
    d1.text((390, 122), 'categoryId & subcategoryId', fill=(251, 191, 36, 255), font=font_mono)

    # 2. Order & Badge
    d1.rectangle([50, 160, 310, 202], outline=(244, 63, 94, 255), width=3, fill=(244, 63, 94, 40))
    d1.text((320, 170), 'order & badge', fill=(251, 113, 133, 255), font=font_mono)

    # 3. Title & Tagline
    d1.rectangle([50, 206, 680, 262], outline=(56, 189, 248, 255), width=3, fill=(56, 189, 248, 40))
    d1.text((690, 220), 'title', fill=(56, 189, 248, 255), font=font_large)

    d1.rectangle([50, 268, 860, 335], outline=(168, 85, 247, 255), width=3, fill=(168, 85, 247, 40))
    d1.text((870, 285), 'tagline', fill=(192, 132, 252, 255), font=font_mid)

    # 4. Media banner
    d1.rectangle([50, 410, 1050, 990], outline=(16, 185, 129, 255), width=4, fill=(16, 185, 129, 25))
    d1.rectangle([65, 425, 430, 465], fill=(13, 21, 39, 230), outline=(16, 185, 129, 255), width=1)
    d1.text((75, 432), 'media[0].url (Banner Thumbnail)', fill=(52, 211, 153, 255), font=font_mid)
    d1.rectangle([280, 960, 820, 995], fill=(13, 21, 39, 230), outline=(16, 185, 129, 255), width=1)
    d1.text((295, 967), 'media[0].caption (Figure Caption)', fill=(52, 211, 153, 255), font=font_mono)

    # 5. NEW: Links Directly Under Thumbnail
    d1.rectangle([50, 1010, 1050, 1080], outline=(234, 179, 8, 255), width=4, fill=(234, 179, 8, 45))
    d1.rectangle([65, 1020, 780, 1065], fill=(13, 21, 39, 240), outline=(234, 179, 8, 255), width=1)
    d1.text((75, 1030), 'links.live ("Visit Live Demo") & links.github ("View Source Code")', fill=(250, 204, 21, 255), font=font_mid)

    # 6. Compact Mobile-Friendly Metrics Row
    d1.rectangle([50, 1100, 1050, 1220], outline=(245, 158, 11, 255), width=3, fill=(245, 158, 11, 35))
    d1.rectangle([65, 1110, 680, 1145], fill=(13, 21, 39, 230), outline=(245, 158, 11, 255), width=1)
    d1.text((75, 1118), 'metrics[] (Compact 3-column row: value + label)', fill=(251, 191, 36, 255), font=font_mono)

    out1 = PILImage.alpha_composite(im1, overlay1).convert('RGB')
    out1.save('doc_annotated_s1.png')

    # Annotate Section 2: Narrative Deep-Dive
    im2 = PILImage.open('pdf_s2_deepdive.png').convert('RGBA')
    overlay2 = PILImage.new('RGBA', im2.size, (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)

    # Overview
    d2.rectangle([50, 20, 690, 160], outline=(56, 189, 248, 255), width=3, fill=(56, 189, 248, 30))
    d2.text((65, 30), 'overview', fill=(56, 189, 248, 255), font=font_mid)

    # Problem
    d2.rectangle([50, 180, 690, 310], outline=(244, 63, 94, 255), width=3, fill=(244, 63, 94, 30))
    d2.text((65, 190), 'problem', fill=(251, 113, 133, 255), font=font_mid)

    # Solution
    d2.rectangle([50, 330, 690, 460], outline=(16, 185, 129, 255), width=3, fill=(16, 185, 129, 30))
    d2.text((65, 340), 'solution', fill=(52, 211, 153, 255), font=font_mid)

    # Highlights
    d2.rectangle([50, 480, 690, 720], outline=(168, 85, 247, 255), width=3, fill=(168, 85, 247, 30))
    d2.text((65, 490), 'architectureHighlights[]', fill=(192, 132, 252, 255), font=font_mid)

    # Key Features
    d2.rectangle([50, 740, 690, 1050], outline=(245, 158, 11, 255), width=3, fill=(245, 158, 11, 30))
    d2.text((65, 750), 'keyFeatures[]', fill=(251, 191, 36, 255), font=font_mid)

    # Sidebar Meta & Tech Stack
    d2.rectangle([720, 20, 1050, 260], outline=(168, 85, 247, 255), width=3, fill=(168, 85, 247, 30))
    d2.text((735, 30), 'role & timeline', fill=(192, 132, 252, 255), font=font_mid)

    d2.rectangle([720, 280, 1050, 480], outline=(234, 179, 8, 255), width=3, fill=(234, 179, 8, 30))
    d2.text((735, 290), 'technologies[] (Tags)', fill=(250, 204, 21, 255), font=font_mid)

    out2 = PILImage.alpha_composite(im2, overlay2).convert('RGB')
    out2.save('doc_annotated_s2.png')

    # Annotate Project Card
    im_card = PILImage.open('project_card.png').convert('RGBA')
    overlay_card = PILImage.new('RGBA', im_card.size, (0, 0, 0, 0))
    dc = ImageDraw.Draw(overlay_card)

    dc.rectangle([30, 30, 630, 370], outline=(16, 185, 129, 255), width=4, fill=(16, 185, 129, 30))
    dc.text((45, 52), 'thumbnail (or media[0].url)', fill=(52, 211, 153, 255), font=font_mid)

    dc.rectangle([30, 390, 630, 440], outline=(56, 189, 248, 255), width=3, fill=(56, 189, 248, 30))
    dc.text((45, 400), 'title -> Links to /projects/[id]', fill=(56, 189, 248, 255), font=font_mid)

    dc.rectangle([30, 445, 630, 520], outline=(168, 85, 247, 255), width=3, fill=(168, 85, 247, 30))
    dc.text((45, 465), 'tagline', fill=(192, 132, 252, 255), font=font_mid)

    dc.rectangle([30, 530, 630, 620], outline=(245, 158, 11, 255), width=3, fill=(245, 158, 11, 30))
    dc.text((45, 555), 'metrics[] (3 column stat pills)', fill=(251, 191, 36, 255), font=font_mid)

    dc.rectangle([30, 630, 630, 700], outline=(234, 179, 8, 255), width=3, fill=(234, 179, 8, 30))
    dc.text((45, 650), 'technologies[0..3] + count', fill=(250, 204, 21, 255), font=font_mid)

    dc.rectangle([30, 715, 630, 780], outline=(16, 185, 129, 255), width=3, fill=(16, 185, 129, 30))
    dc.text((45, 735), 'id -> URL & links.github / links.live', fill=(52, 211, 153, 255), font=font_mid)

    out_card = PILImage.alpha_composite(im_card, overlay_card).convert('RGB')
    out_card.save('doc_annotated_card.png')
    print("Annotations completed!")

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b"))
        self.setStrokeColor(colors.HexColor("#1e293b"))
        self.setLineWidth(0.75)
        self.line(40, 755, 572, 755)
        self.drawString(40, 762, "Project Schema & UI Mapping Guide — portfolio/src/data/projects.json")
        self.line(40, 42, 572, 42)
        self.drawString(40, 30, "Confidential — Portfolio Engineering Specification")
        self.drawRightString(572, 30, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf():
    asyncio.run(capture_screenshots())
    slice_and_annotate()

    pdf_filename = "project_object_mapping_guide.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=23, leading=27, textColor=colors.HexColor("#0f172a"))
    subtitle_style = ParagraphStyle('DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=15, textColor=colors.HexColor("#475569"))
    h1_style = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=colors.HexColor("#0f172a"), spaceBefore=10, spaceAfter=5)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor("#334155"))
    code_style = ParagraphStyle('CodeStyle', parent=styles['Normal'], fontName='Courier-Bold', fontSize=8, leading=10, textColor=colors.HexColor("#0f766e"))
    tag_style = ParagraphStyle('TagStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor("#2563eb"))

    story = []

    # PAGE 1: TITLE & SCHEMA
    story.append(Paragraph("Project Object Specification & UI Mapping Guide", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("A complete visual mapping reference explaining every attribute of the <b>Project</b> schema in <code>src/data/projects.json</code> and how each renders across the <b>Project Detail Case Study Page</b> (<code>/projects/[id]</code>) and the <b>Homepage Carousel Card</b>.", subtitle_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#e2e8f0"), spaceAfter=10))

    story.append(Paragraph("1. Schema Overview & Type Definition", h1_style))
    story.append(Paragraph("Every project entry stored in <code>projects.json</code> adheres to the TypeScript interface <code>Project</code> in <code>src/data/portfolioData.ts</code>. The categories taxonomy is maintained separately in <code>projectCategories.json</code>.", body_style))
    story.append(Spacer(1, 6))

    headers = [
        Paragraph("<b>Field Name</b>", tag_style),
        Paragraph("<b>Data Type</b>", tag_style),
        Paragraph("<b>Description</b>", tag_style),
        Paragraph("<b>Target UI Location</b>", tag_style)
    ]
    rows = [headers]
    fields_data = [
        ("id", "string (slug)", "Unique kebab-case URL identifier", "Route URL path (/projects/[id])"),
        ("title", "string", "Official headline name of the project", "Page H1 & Carousel card title"),
        ("tagline", "string", "High-impact one-liner pitch", "Page subtitle & Card description"),
        ("order", "number", "Determines sequential display order", "Badge `#order` on both views"),
        ("categoryId", "string (FK)", "Foreign key to projectCategories.json", "Breadcrumb & category filter"),
        ("subcategoryId", "string (FK)", "Foreign key to subcategory", "Header pill & Card category tag"),
        ("featured", "boolean", "Flag indicating priority highlight", "Filter sorting & carousel priority"),
        ("badge", "string (opt)", "Optional badge (e.g. 'Full-Stack Flagship')", "Pink accent chip in header"),
        ("role", "string", "Your engineering title on the project", "Sidebar 'Role' metadata row"),
        ("timeline", "string", "Duration or launch timeframe", "Sidebar 'Timeline' metadata row"),
        ("thumbnail", "string (opt)", "Path to 16:9 thumbnail photo", "Homepage card thumbnail photo"),
        ("media[]", "ProjectMedia[]", "Array of images with captions", "Banner mockup (media[0]) & Gallery (media[1..N])"),
        ("metrics[]", "ProjectMetric[]", "Key performance metrics (label, value)", "Mobile-optimized 3-col stat bar"),
        ("technologies[]", "string[]", "Tools, frameworks, and libraries", "Sidebar tech stack & card tags"),
        ("overview", "string", "Executive project overview", "Executive Overview paragraph"),
        ("problem", "string", "The core architectural/business challenge", "The Engineering Problem card"),
        ("solution", "string", "How the challenge was engineered", "The Architectural Solution card"),
        ("architectureHighlights[]", "string[]", "Technical architecture achievements", "Architecture Highlights list"),
        ("keyFeatures[]", "string[]", "Array of user-facing capabilities", "Key Features 2-column grid"),
        ("links", "ProjectLinks", "Live demo (live) & GitHub (github)", "Direct action buttons under thumbnail")
    ]

    for f, t, d, loc in fields_data:
        rows.append([
            Paragraph(f"<code>{f}</code>", code_style),
            Paragraph(t, body_style),
            Paragraph(d, body_style),
            Paragraph(f"<b>{loc}</b>", body_style)
        ])

    table = Table(rows, colWidths=[105, 80, 180, 167])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")])
    ]))
    story.append(table)

    # PAGE 2: HEADER, THUMBNAIL, UNDER-THUMBNAIL LINKS & MOBILE METRICS
    story.append(PageBreak())
    story.append(Paragraph("2. Visual Mapping: Header, Links Under Thumbnail & Mobile Metrics", h1_style))
    story.append(Paragraph("Shows the updated top section of <code>/projects/[id]</code> with <b>Live Demo & GitHub buttons placed directly under the thumbnail</b>, and the <b>compact mobile-friendly 3-column metrics row</b>:", body_style))
    story.append(Spacer(1, 6))

    img_w = 532
    story.append(RLImage('doc_annotated_s1.png', width=img_w, height=480))
    story.append(Spacer(1, 8))

    desc_s1 = [
        [Paragraph("<b>Key</b>", tag_style), Paragraph("<b>Updated Render Placement</b>", tag_style)],
        [Paragraph("<code>links.live</code> & <code>links.github</code>", code_style), Paragraph("<b>Placed directly under the thumbnail</b> as prominent action buttons ('Visit Live Demo' & 'View Source Code') for immediate accessibility.", body_style)],
        [Paragraph("<code>metrics[]</code>", code_style), Paragraph("<b>Mobile-optimized 3-column row</b>: Takes significantly less vertical space on mobile and scales smoothly to desktop.", body_style)],
        [Paragraph("<code>media[0]</code>", code_style), Paragraph("Hero 16:9 banner container with caption displayed below as <i>Fig 1.0</i>.", body_style)],
        [Paragraph("<code>categoryId</code>, <code>subcategoryId</code>, <code>order</code>", code_style), Paragraph("Breadcrumbs path and top category pill with order tag.", body_style)]
    ]
    t_s1 = Table(desc_s1, colWidths=[160, 372])
    t_s1.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f8fafc")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_s1)

    # PAGE 3: CASE STUDY DEEP DIVE & MULTI-MEDIA GALLERY
    story.append(PageBreak())
    story.append(Paragraph("3. Visual Mapping: Narrative Deep-Dive & Additional Media", h1_style))
    story.append(Paragraph("Shows the narrative sections (Overview, Problem, Solution, Highlights, Key Features) along with how multiple images in the <code>media[]</code> array render into the visual gallery:", body_style))
    story.append(Spacer(1, 6))

    story.append(RLImage('doc_annotated_s2.png', width=img_w, height=480))
    story.append(Spacer(1, 8))

    desc_s2 = [
        [Paragraph("<b>Key</b>", tag_style), Paragraph("<b>Rendering Description</b>", tag_style)],
        [Paragraph("<code>media[1..N]</code> (Multi-media)", code_style), Paragraph("When <code>media</code> contains more than 1 item, an <b>'Additional Visuals & Diagrams'</b> gallery renders with individual aspect-video cards and figure captions.", body_style)],
        [Paragraph("<code>overview</code>, <code>problem</code>, <code>solution</code>", code_style), Paragraph("Executive Overview prose followed by color-coded alert cards for The Engineering Problem and The Architectural Solution.", body_style)],
        [Paragraph("<code>architectureHighlights[]</code> & <code>keyFeatures[]</code>", code_style), Paragraph("Bulleted technical highlights with emerald checkmarks, and a 2-column grid of key feature capabilities.", body_style)],
        [Paragraph("<code>role</code>, <code>timeline</code>, <code>technologies[]</code>", code_style), Paragraph("Right-hand sticky sidebar with metadata overview and interactive tech stack tags.", body_style)]
    ]
    t_s2 = Table(desc_s2, colWidths=[160, 372])
    t_s2.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f8fafc")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_s2)

    # PAGE 4: HOMEPAGE CAROUSEL CARD
    story.append(PageBreak())
    story.append(Paragraph("4. Visual Mapping: Homepage Carousel Project Card", h1_style))
    story.append(Paragraph("Every project entry is also automatically mapped to the interactive sideways carousel card in <code>ProjectsSection.tsx</code> on the home page:", body_style))
    story.append(Spacer(1, 6))

    story.append(RLImage('doc_annotated_card.png', width=380, height=480))
    story.append(Spacer(1, 8))

    desc_card = [
        [Paragraph("<b>Key</b>", tag_style), Paragraph("<b>Card Rendering Behavior</b>", tag_style)],
        [Paragraph("<code>thumbnail</code>", code_style), Paragraph("Top 16:9 photo preview area. If absent, falls back to <code>media[0].url</code>, then to <code>placeholder-thumb.svg</code>.", body_style)],
        [Paragraph("<code>subcategoryId</code>, <code>order</code>", code_style), Paragraph("Floating top badge pills with category theme glow and numerical order tag.", body_style)],
        [Paragraph("<code>title</code>, <code>tagline</code>", code_style), Paragraph("Card headline linking directly to <code>/projects/[id]</code> with hover arrow transition and truncated summary.", body_style)],
        [Paragraph("<code>metrics[]</code>", code_style), Paragraph("Compact 3-column metric preview strip displaying top 3 statistics.", body_style)],
        [Paragraph("<code>technologies[]</code>", code_style), Paragraph("Shows first 4 technology pills + counter for remaining tech (e.g. <code>+4 more</code>).", body_style)],
        [Paragraph("<code>id</code>, <code>links</code>", code_style), Paragraph("Bottom action row with 'Explore Case Study' deep link and instant GitHub/Live demo icon buttons.", body_style)]
    ]
    t_card = Table(desc_card, colWidths=[150, 382])
    t_card.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f8fafc")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_card)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated PDF: {pdf_filename}")

if __name__ == '__main__':
    build_pdf()
