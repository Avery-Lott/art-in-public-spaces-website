from flask import Flask, render_template, abort

app = Flask(__name__)


@app.route("/")
def home():
    stats = [
        {"fact": "Color Moves You Kindly", "label": "Our Project", "color": "cyan"},
        {"fact": "5 Artists", "label": "Our Team", "color": "magenta"},
        {"fact": "CU Boulder", "label": "Our Campus", "color": "yellow"},
    ]
    pillars = [
        {
            "letter": "C",
            "title": "Construct",
            "desc": "We create original designs that become full-sized art installations.",
            "color": "cyan",
        },
        {
            "letter": "M",
            "title": "Motivate",
            "desc": "We bring together students, staff, and faculty to create new works.",
            "color": "magenta",
        },
        {
            "letter": "Y",
            "title": "Yield",
            "desc": "We deliver art to public spaces around Boulder.",
            "color": "yellow",
        },
        {
            "letter": "K",
            "title": "Kinetic",
            "desc": "We are always moving to bring artistic life to our community.",
            "color": "key",
        },
    ]
    return render_template("home.html", stats=stats, pillars=pillars)

def get_projects():
    return [
        {
            "id": "color_moves_you_kindly",
            "image": "../static/img/CMYK.png",
            "title": "Color Moves You Kindly",
            "category": "Installation",
            "location": "Location TBD",
            "season": "Spring 2026",
            "color": "magenta",
            "filter": "installations",
            "shortdesc": "<em>Color Moves You Kindly</em> is a portable public art installation that brings light, sound, "
                         "and community into dialogue. The work consists of three interlocking acrylic panels—cyan, "
                         "magenta, and yellow—that shift and transform with the sun’s movement. As daylight filters "
                         "through the panels, transparent overlaps create ever-changing fields of color, producing a "
                         "kinetic visual experience that evolves depending on the viewer’s perspective...",
            "description": "<h2><em>Color Moves You Kindly</em> is a portable public art installation that brings light, sound, "
                           "and community into dialogue.</h2><p>The work consists of three interlocking acrylic panels—cyan, "
                           "magenta, and yellow—that shift and transform with the sun’s movement. As daylight filters "
                           "through the panels, transparent overlaps create ever-changing fields of color, producing a "
                           "kinetic visual experience that evolves depending on the viewer’s perspective. </p> "
                           "<p>Complementing the light, three integrated seats invite participants to become co-creators of "
                           "the piece. Motion sensors beneath each seat trigger ambient chords that layer and harmonize as more "
                           "people gather. A final, resonant chord is activated only when all three seats are filled, "
                           "symbolizing collaboration and collective presence. In this way, the sculpture is not fully "
                           "realized until the community activates it—turning public seating into a shared, immersive artwork. </p>"
                           "<p>The installation contributes to Boulder’s <em>Experiments in Public Art</em> program by offering a"
                           " mobile, lightweight work that prioritizes experience over permanence. Its portability allows it to appear "
                           "in diverse contexts across the city, from parks to plazas, ensuring broad accessibility. The work "
                           "fosters moments of pause and connection, carving out an “ethereal pocket” of color and sound in the"
                           " midst of Boulder’s urban bustle.</p>"
                           "<p> Ultimately, this work aims to enrich Boulder’s cultural landscape "
                           "by offering a living, participatory artwork that celebrates creativity, collaboration, and the city’s "
                           "unique balance of natural beauty and technological ingenuity. </p>"
        },
    ]
@app.route("/project/<pid>")
def project(pid):
    projects = get_projects()

    focusedProject = next(
        (p for p in projects if p["id"] == pid),
        None
    )

    if not focusedProject:
        abort(404)

    return render_template("project.html", project=focusedProject)


@app.route("/gallery")
def gallery():
    projects = get_projects()
    return render_template("gallery.html", projects=projects)


@app.route("/about")
def about():
    team = [
        {
            "headshot": "../static/img/aps_mowgli.jpg",
            "name": "Mowgli Gunn",
            "role": "Founder, VP",
            "bio": "Boulder, CO.",
            "color": "cyan",
            "email": "mowgli.gunn@colorado.edu"
        },
        {
            "headshot": "none",
            "name": "Polly Torian",
            "role": "President",
            "bio": "Club President",
            "color": "magenta",
            "email": "polly.torian@colorado.edu"
        },
        {
            "headshot": "../static/img/marshall_aps.png",
            "name": "Marshall Drook",
            "role": "Secretary",
            "bio": "Club Secretary",
            "email": "marshall.drook@colorado.edu",
            "color": "yellow",
        },
        {
            "headshot": "../static/img/aps_group.jpg",
            "name": "The APS Group",
            "role": "2025",
            "bio": "New Student Organization of the year",
            "email": "none",
            "color": "key",
        },
    ]
    contact = {
        "email": "aps@colorado.edu",
        "address": "Often in the UMC, room number varies",
    }
    return render_template("about.html", team=team, contact=contact)


@app.route("/calendar")
def calendar():
    events = [
        {
            "reoccurring": True,
            "day": 3,
            "weekday": 5,
            "month": "Apr",
            "js_month":3,
            "year": 2026,
            "title": "Club Meeting",
            "desc": "Regular Club Meeting",
            "time": "6:00 PM",
            "color": "cyan",
        },
    ]
    return render_template("calendar.html", events=events)


if __name__ == "__main__":
    app.run(debug=True)
