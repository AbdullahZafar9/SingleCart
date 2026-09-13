import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#78716c"))

        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "SingleCart • Multi-Tenant Virtual Mall Platform — Technical Overview")
            self.setStrokeColor(colors.HexColor("#e7e5e4"))
            self.setLineWidth(0.5)
            self.line(54, 748, 558, 748)

        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_text)
        self.drawString(54, 36, "CONFIDENTIAL & PROPRIETARY — PREPARED FOR TECHNICAL RECRUITER EVALUATION")
        self.setStrokeColor(colors.HexColor("#e7e5e4"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        self.restoreState()

def generate_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    c_primary = colors.HexColor("#c2410c")      # Terracotta
    c_dark = colors.HexColor("#1c1917")         # Deep Charcoal
    c_secondary = colors.HexColor("#44403c")    # Medium Grey
    c_bg_light = colors.HexColor("#fafaf9")     # Cream surface
    c_border = colors.HexColor("#e7e5e4")       # Subtle border
    c_accent = colors.HexColor("#0284c7")       # Tech Blue

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_dark,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=c_primary,
        spaceAfter=14
    )
    
    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=c_dark,
        spaceBefore=14,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=c_primary,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=c_secondary,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_secondary,
        leftIndent=12,
        spaceAfter=3
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=c_dark
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.white
    )

    story = []

    # Title & Metadata Banner
    story.append(Paragraph("SingleCart • Technical Platform Architecture", title_style))
    story.append(Paragraph("Next-Generation Multi-Tenant Virtual Mall & Unified Checkout Platform", subtitle_style))
    
    meta_data = [
        [
            Paragraph("<b>Author / Engineer:</b> Candidate / Portfolio", table_cell),
            Paragraph("<b>Stack:</b> React 18 • Supabase • REST • CSS Modules", table_cell),
        ],
        [
            Paragraph("<b>Target Domain:</b> E-Commerce / SaaS / Multi-Tenancy", table_cell),
            Paragraph("<b>Deployment:</b> Vercel Continuous Deployment • GitHub Sync", table_cell),
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#fff7ed")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#ffedd5")),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    # Section 1: Executive Summary
    story.append(Paragraph("1. Executive Summary & Problem Solved", h1_style))
    story.append(Paragraph(
        "Modern digital commerce often forces users to create individual accounts and place fragmented separate orders across individual independent brand storefronts. <b>SingleCart</b> addresses this friction by providing a <b>3-sided virtual mall architecture</b>. Customers explore curated, independent boutique stores under a single roof, dropping items from multiple vendors into <b>one consolidated bag</b> with zero signup hurdles. Simultaneously, store owners manage their operations in isolated, real-time dashboards, while platform administrators oversee multi-tenant health and revenue aggregation.",
        body_style
    ))

    # Section 2: 3-Sided Ecosystem Architecture
    story.append(Paragraph("2. Three-Sided Ecosystem Overview", h1_style))
    
    eco_data = [
        [Paragraph("Portal", table_header), Paragraph("Target Persona", table_header), Paragraph("Key Capabilities & Technical Highlights", table_header)],
        [
            Paragraph("<b>Customer Mall</b><br/><code>/mall</code>", table_cell),
            Paragraph("Shoppers & Mall Visitors<br/>(Zero login friction)", table_cell),
            Paragraph("• Multi-vendor unified cart with per-store order routing.<br/>• Live Order Tracker with 4-stage visual pipeline stepper.<br/>• Phone-based order history lookup without accounts.<br/>• HTML5 Canvas digital receipt generation and download.<br/>• Interactive catalog with product zoom, reviews, and wishlist.", table_cell)
        ],
        [
            Paragraph("<b>Retailer Operations</b><br/><code>/retailer</code>", table_cell),
            Paragraph("Verified Store Managers & Merchants", table_cell),
            Paragraph("• <b>Theme Isolation:</b> Dark/light preferences strictly scoped per store ID.<br/>• Real-time order pipeline with audio alerts and status transitions.<br/>• Full catalog manager: product creation, editing, category filters, and image management.<br/>• Customizable boutique storefront banner and merchant profile.", table_cell)
        ],
        [
            Paragraph("<b>Admin Command Center</b><br/><code>/admin</code>", table_cell),
            Paragraph("Global Mall Operators & Platform Executives", table_cell),
            Paragraph("• Automated store provisioning with one-click credential generation.<br/>• Automated EmailJS merchant welcome and setup notifications.<br/>• Real-time revenue analytics: GMV, store count, Average Ticket Size.<br/>• Global order history audit log with date filters and catalog purge controls.", table_cell)
        ]
    ]
    eco_table = Table(eco_data, colWidths=[95, 115, 294])
    eco_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.5, c_border),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_bg_light])
    ]))
    story.append(eco_table)
    story.append(Spacer(1, 10))

    # Section 3: Technical Architecture & Core Innovations
    story.append(Paragraph("3. Technical Architecture & Engineering Innovations", h1_style))
    story.append(Paragraph(
        "<b>A. Hybrid Persistence & Graceful Offline Fallback</b><br/>"
        "SingleCart incorporates a resilient two-tier persistence engine. When Supabase cloud credentials are active, live data synchronizes via WebSockets and PostgreSQL Row Level Security. If running in an unconfigured or offline sandbox environment, the app seamlessly activates an in-memory and local storage caching layer with optimistic UI updates, ensuring evaluators always experience a fully functional app without broken API states.",
        body_style
    ))
    story.append(Paragraph(
        "<b>B. Per-Tenant Theme Scoping Engine</b><br/>"
        "Multi-tenant dashboards frequently suffer from theme bleeding. SingleCart solves this by persisting theme tokens with tenant-scoped keys (<code>sc_retailer_theme_${shop.id}</code>). When one merchant switches to dark mode, their preference is completely isolated to their boutique, while other retailers and the global mall remain untouched.",
        body_style
    ))
    story.append(Paragraph(
        "<b>C. Fluid Real-Time Character Streaming</b><br/>"
        "The Welcome screen features a non-blocking typewriter engine streaming value propositions character-by-character with an active cursor. The container employs CSS layout stabilization rules to guarantee zero Cumulative Layout Shift (CLS) on both mobile and laptop screens.",
        body_style
    ))

    # Section 4: Security & Data Model
    story.append(Paragraph("4. Security Architecture & Data Modeling", h1_style))
    story.append(Paragraph(
        "• <b>PostgreSQL Row Level Security (RLS):</b> Ensures public read access to catalog items while restricting order modifications and catalog updates strictly to the owning store's <code>retailer_id</code>.<br/>"
        "• <b>Role-Based Access Control (RBAC):</b> Explicit separation between anonymous shoppers, authenticated retailers, and global administrative operators.<br/>"
        "• <b>Automated Credential Generation:</b> Admin-provisioned merchants receive cryptographically randomized temporary passwords dispatched via secure EmailJS templates.",
        body_style
    ))

    # Section 5: Recruiter Evaluation Credentials
    story.append(Paragraph("5. Recruiter Quick-Evaluation Credentials", h1_style))
    
    cred_data = [
        [Paragraph("Portal", table_header), Paragraph("Route", table_header), Paragraph("Demo Account", table_header), Paragraph("Password", table_header)],
        [
            Paragraph("Welcome / Customer Mall", table_cell),
            Paragraph("<code>/</code> or <code>/mall</code>", table_cell),
            Paragraph("Frictionless Anonymous User", table_cell),
            Paragraph("<i>None Required</i>", table_cell)
        ],
        [
            Paragraph("Retailer Operations", table_cell),
            Paragraph("<code>/retailer</code>", table_cell),
            Paragraph("<code>aura@singlecart.com</code>", table_cell),
            Paragraph("<code>store123</code>", table_cell)
        ],
        [
            Paragraph("Admin Command Center", table_cell),
            Paragraph("<code>/admin</code>", table_cell),
            Paragraph("<code>admin@singlecart.com</code>", table_cell),
            Paragraph("<code>12345678</code>", table_cell)
        ]
    ]
    cred_table = Table(cred_data, colWidths=[120, 110, 150, 124])
    cred_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_dark),
        ('BOX', (0, 0), (-1, -1), 0.5, c_border),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_bg_light])
    ]))
    story.append(cred_table)
    story.append(Spacer(1, 10))

    # Section 6: Mobile & Desktop Responsiveness
    story.append(Paragraph("6. Cross-Platform Responsive Standards", h1_style))
    story.append(Paragraph(
        "SingleCart was rigorously optimized for diverse device form factors:<br/>"
        "• <b>Mobile Handhelds (&lt; 640px):</b> Full-viewport slide-in drawers, momentum-scrolled category chips, streamlined product cards with sub-image badges, sticky bottom checkout action bar, and minimum 44px tap targets.<br/>"
        "• <b>Laptops & Desktops:</b> Balanced 1280px max-width layout containers, 4-column product grids, multi-dimensional analytics sidebars, and keyboard accessibility.",
        body_style
    ))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully at: {output_path}")

if __name__ == "__main__":
    target = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "SingleCart_Platform_Overview.pdf")
    generate_pdf(target)
