from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/gallery')
def get_gallery():
    return render_template("gallery.html")

@app.route('/calendar')
def get_calendar():
    return render_template("calendar.html")

@app.route('/about')
def get_about():
    return render_template("about.html")

@app.route('/contact')
def get_contact():
    return render_template("contact.html")

if __name__ == 'main':
    app.run(debug=True)