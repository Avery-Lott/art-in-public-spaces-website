from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    stats = [
        {"number": "24", "label": "Projects", "color": "cyan"},
        {"number": "12", "label": "Artists", "color": "magenta"},
        {"number": "8", "label": "Cities", "color": "yellow"},
        {"number": "3K+", "label": "Community", "color": "key"},
    ]
    pillars = [
        {
            "letter": "C",
            "title": "Create",
            "desc": "We design and produce original artworks tailored to each site and community.",
            "color": "cyan",
        },
        {
            "letter": "M",
            "title": "Mobilize",
            "desc": "We bring together artists, volunteers, and partners to make projects happen.",
            "color": "magenta",
        },
        {
            "letter": "Y",
            "title": "Yield",
            "desc": "We deliver lasting impact\u2009—\u2009art that endures and inspires long after installation.",
            "color": "yellow",
        },
        {
            "letter": "K",
            "title": "Kindle",
            "desc": "We ignite creativity in young artists through workshops and mentorship.",
            "color": "key",
        },
    ]
    return render_template("home.html", stats=stats, pillars=pillars)


@app.route("/gallery")
def gallery():
    projects = [
        {
            "title": "Chromatic Convergence",
            "category": "Mural",
            "location": "Downtown District",
            "season": "Spring 2025",
            "color": "cyan",
            "filter": "murals",
        },
        {
            "title": "Signal & Noise",
            "category": "Installation",
            "location": "Riverside Park",
            "season": "Winter 2024",
            "color": "magenta",
            "filter": "installations",
        },
        {
            "title": "Urban Canvas",
            "category": "Pop-up",
            "location": "Market Square",
            "season": "Fall 2024",
            "color": "yellow",
            "filter": "popups",
        },
        {
            "title": "Line of Sight",
            "category": "Mural",
            "location": "Arts District",
            "season": "Summer 2024",
            "color": "key",
            "filter": "murals",
        },
        {
            "title": "Crossroads",
            "category": "Installation",
            "location": "Central Station",
            "season": "Spring 2024",
            "color": "magenta",
            "filter": "installations",
        },
        {
            "title": "Spectrum",
            "category": "Pop-up",
            "location": "Community Center",
            "season": "Winter 2023",
            "color": "cyan",
            "filter": "popups",
        },
    ]
    return render_template("gallery.html", projects=projects)


@app.route("/about")
def about():
    team = [
        {
            "name": "Jordan Rivera",
            "role": "President",
            "bio": "MFA in Public Art. Led 15+ installations across the region. Passionate about community-driven design and placemaking.",
            "email": "jordan@artinpublic.org",
            "color": "cyan",
        },
        {
            "name": "Mika Chen",
            "role": "Creative Director",
            "bio": "Background in graphic design and typography. Oversees all visual identity and ensures every project pushes creative boundaries.",
            "email": "mika@artinpublic.org",
            "color": "magenta",
        },
        {
            "name": "Sam Okafor",
            "role": "Outreach Lead",
            "bio": "Community organizer with a talent for building partnerships. Connects the club with neighborhoods, schools, and local businesses.",
            "email": "sam@artinpublic.org",
            "color": "yellow",
        },
        {
            "name": "Alex Kowalski",
            "role": "Operations",
            "bio": "Keeps the gears turning\u2009—\u2009logistics, permits, budgets, and timelines. Ensures every project runs smoothly from concept to completion.",
            "email": "alex@artinpublic.org",
            "color": "key",
        },
    ]
    contact = {
        "email": "hello@artinpublicspaces.org",
        "address": "142 Color Lane, Arts District",
        "social": "@artinpublicspaces",
    }
    return render_template("about.html", team=team, contact=contact)


@app.route("/calendar")
def calendar():
    events = [
        {
            "day": 5,
            "month": "Apr",
            "title": "Spring Mural Kickoff",
            "desc": "Community mural painting day at Riverside Park",
            "time": "10:00 AM",
            "color": "cyan",
        },
        {
            "day": 12,
            "month": "Apr",
            "title": "Artist Workshop: Screen Printing",
            "desc": "Learn CMYK screen printing techniques with Mika Chen",
            "time": "2:00 PM",
            "color": "magenta",
        },
        {
            "day": 19,
            "month": "Apr",
            "title": "Pop-Up Gallery: Market Square",
            "desc": "One-day outdoor exhibition featuring new member work",
            "time": "11:00 AM",
            "color": "yellow",
        },
        {
            "day": 26,
            "month": "Apr",
            "title": "Monthly Meeting & Critique",
            "desc": "Review ongoing projects and plan May installations",
            "time": "6:00 PM",
            "color": "key",
        },
    ]
    # Calendar event data for JS (month is 0-indexed for JS Date)
    cal_events = [
        {"day": 5, "month": 3, "year": 2026, "title": "Mural Kickoff", "color": "cyan"},
        {"day": 12, "month": 3, "year": 2026, "title": "Screen Printing", "color": "magenta"},
        {"day": 19, "month": 3, "year": 2026, "title": "Pop-Up Gallery", "color": "yellow"},
        {"day": 26, "month": 3, "year": 2026, "title": "Monthly Meeting", "color": "key"},
        {"day": 3, "month": 4, "year": 2026, "title": "Mural Jam", "color": "cyan"},
        {"day": 10, "month": 4, "year": 2026, "title": "Youth Workshop", "color": "magenta"},
        {"day": 17, "month": 4, "year": 2026, "title": "Gallery Night", "color": "yellow"},
        {"day": 24, "month": 4, "year": 2026, "title": "Planning Session", "color": "key"},
    ]
    return render_template("calendar.html", events=events, cal_events=cal_events)


if __name__ == "__main__":
    app.run(debug=True)
