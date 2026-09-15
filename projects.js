/**
 * PROJECT DATABASE
 * ----------------
 * To add a new project, copy an existing entry and paste it at the top or bottom of the array.
 * 
 * Fields:
 * - title (string): Project title (optional for text boxes)
 * - year (string/number, optional): Year produced (automatically appears in top filter tags)
 * - pinned (boolean, optional): Set to true to keep the project first in every order mode
 * - doubleWidth (boolean, optional): Set to true to make the project span two grid spaces
 * - videoUrl (string, optional): Any YouTube, Vimeo, or direct .mp4 link (e.g. "video.mp4" or web URL)
 * - thumbnailUrl (string, optional): Image shown before a video starts; clicking it starts playback
 * - imageUrl (string, optional): Image path or URL instead of video (e.g. "still.jpg")
 * - aspectRatio (string, optional): Media aspect ratio, e.g. "16/9" (default), "4/3", "1/1", "9/16", "2.39/1"
 * - tags (array of strings): Filter tags (e.g. ["Animation", "Short Film"])
 * - expandable (boolean, optional): Set to false to keep card permanently open with no arrow
 * 
 * How to add a Text Box (Intro / Contact Info):
 * - Simply leave out videoUrl and imageUrl! It will display as an open text card.
 * 
 * How to add an Image instead of Video:
 * - Use imageUrl: "image.jpg" instead of videoUrl.
 * 
 * Description & Flexible Content:
 * - description: Multiline text or HTML. You can arrange blocks in ANY order you like:
 *     - Plain text paragraphs (separated by blank lines, or <p> tags)
 *     - Images: <img src="image.jpg">
 *     - Embedded videos: <iframe src="..."> or <video src="...">
 *     - Versatile tables: <table-box title="Credits">...</table-box>
 *       (Title is optional! Use <table-box> for a table without a title).
 */

const projects = window.projects = [
  {
    title: "",
    pinned: true,
    description: `
      <p>📌 Hei! I'm Sander Joon, a film director and animator based in Estonia. Get in touch!</p>
      <p><a href="mailto:sander.joon@gmail.com">sander.joon@gmail.com</a></p>
      <p><a href="https://www.instagram.com/sanderjoon/">@sanderjoon</a></p>
      <p><a href="https://docs.google.com/document/d/1Hi_yvdrPqwd7v-gbUWIhDkpgFimJlm9dMqAGZVh70uQ/edit?usp=sharing">CV</a></p>
    `
  },
  {
    title: "📌 Sierra 🚗💨💨💨",
    pinned: true,
    doubleWidth: true,
    year: "2022",
    videoUrl: "https://vimeo.com/1035359933",
    thumbnailUrl: "thumbs/sierra.mp4",
    aspectRatio: "16/9",
    tags: ["Films"],
    description: `
    <p>is an <b>Oscars Shortlisted</b> short animation</p>
    <p>Parents often push their children to follow their steps. In this case, the father's obsession with rally turns the kid into a car tire. Loosely inspired by the director's childhood, Sierra takes us into the surreal car racing world.</p>

      <table-box title="Credits">
        Author: Sander Joon
        Producers: Erik Heinsalu & Aurelia Aasa
        Sound: Matis Rei
        Music: Misha Panfilov
        Animation: Sander Joon, Henri Veermäe, Valya Paneva, Teresa Baroet
        Year: 2022
      </table-box>

      <table-box title="Selections & Awards">
        Premiered: Clermont-Ferrand Short Film Festival
        Shortlisted: 95th Academy Awards
        Best Animation: San Francisco International Film Festival
        Public Prize: Ottawa International Animation Festival
      </table-box>
    `
  },
  {
    title: "Sounds Good",
    year: "...-2018",
    videoUrl: "https://www.youtube.com/embed/iUZXn3ibEEM",
    thumbnailUrl: "thumbs/soundsgood.mp4",
    aspectRatio: "16/9",
    tags: ["Films"],
    description: `
      <p>Boom operator is trying to record the sound of mushrooms.</p>
    `
  },
  {
    title: "Moulinet",
    year: "...-2018",
    videoUrl: "https://www.youtube.com/watch?v=z5KUJnEhqwE",
    aspectRatio: "2.35/1",
    tags: ["Films"],
    description: `
    <p>There are some things we understand just naturally, and again some that we can't understand no matter how hard we try.</p>
    `
  },
  {
  title: "Velodrool",
    year: "...-2018",
    videoUrl: "https://www.youtube.com/watch?v=mPMnFKDFp0E",
    thumbnailUrl: "thumbs/velodrool.mp4",
    aspectRatio: "16/9",
    tags: ["Films"],
    description: `
      <p>An addicted biker runs out of cigarettes. He joins a race to get more, but has to take help from some peculiar people in the audience to stay in the competition.</p>
      <p><b>Making of Velodrool:</b></p>
      <iframe src="https://www.youtube.com/embed/QqkXo8MnPas"></iframe>
    `
  },
    {
  title: "Inktober 2021",
    year: "2021",
    videoUrl: "https://freight.cargo.site/m/V1739989098320343447109578588035/026_Connect_1.mp4",
    thumbnailUrl: "https://freight.cargo.site/m/V1739989098320343447109578588035/026_Connect_1.mp4",
    aspectRatio: "1/1",
    tags: ["Play"],
    description: `
      <video style="aspect-ratio: 1 / 1;" controls loop><source src="https://freight.cargo.site/m/Z1739838611128802441968292528003/003_Vessel-2_1.mp4" type="video/mp4"></video>
      <video style="aspect-ratio: 1 / 1;" controls loop><source src="https://freight.cargo.site/m/F1739989098246556470814740381571/021_Open_1.mp4" type="video/mp4"></video>
      <video style="aspect-ratio: 1 / 1;" controls loop><source src="https://freight.cargo.site/m/V1739989098117429262298773520259/015_Helmet_1.mp4" type="video/mp4"></video>
    `
  }
  ];
