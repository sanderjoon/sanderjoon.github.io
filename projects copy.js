/**
 * PROJECT DATABASE
 * ----------------
 * To add a new project, copy an existing entry and paste it at the top or bottom of the array.
 * 
 * Fields:
 * - title (string): Project title (optional for text boxes)
 * - year (string/number, optional): Year produced (automatically appears in top filter tags)
 * - videoUrl (string, optional): Any YouTube, Vimeo, or direct .mp4 link (e.g. "video.mp4" or web URL)
 * - thumbnailUrl (string, optional): Image or MP4 shown before a video starts
 * - hoverVideoUrl (string, optional): Direct .mp4 preview played while hovering the thumbnail
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
    description: `
      <p>Hei! I'm Sander Joon, a film director and animator based in Estonia.</p>
      <p><a href="mailto:sander.joon@gmail.com">sander.joon@gmail.com</a></p>
      <p><a href="https://www.instagram.com/sanderjoon/">@sanderjoon</a></p>
    `
  },
  {
    title: "Sierra",
    year: "2022",
    videoUrl: "https://vimeo.com/1035359933",
    aspectRatio: "16/9",
    tags: ["Short Film", "Animation", "Festival"],
    description: `
      <p>Parents often push their children to follow their steps. In this case, the father's obsession with rally turns the kid into a car tire. Loosely inspired by the director's childhood, Sierra takes us into the surreal car racing world.</p>

      <table-box title="Credits">
        Author: Sander Joon
        Producers: Erik Heinsalu & Aurelia Aasa
        Sound: Matis Rei
        Music: Misha Panfilov
        Animation: Sander Joon, Henri Veermäe, Valya Paneva, Teresa Baroet
      </table-box>

      <p>Premiered at Clermont-Ferrand, won San Francisco IFF, Ottawa IAF, and was shortlisted for the 95th Academy Awards.</p>

      <table-box title="Selections & Awards">
        Shortlisted: 95th Academy Awards
        Best Animation: San Francisco International Film Festival
        Grand Prize: Ottawa International Animation Festival
        Audience Award: Clermont-Ferrand Short Film Festival
      </table-box>

      <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80" alt="Sierra still" />
    `
  },
  {
    title:"",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    tags: ["Stills"],
  },
  {
    title: "Sounds Good",
    year: "2018",
    videoUrl: "https://vimeo.com/284988775",
    aspectRatio: "4/3",
    tags: ["Film"]
  },
  {
    title: "Velodrool",
    year: "2015",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    aspectRatio: "16/9",
    tags: ["Film", "Animation"],
    description: `
      An addicted bicycle rider runs out of cigarettes. He joins a race to win more, but has to face bizarre obstacles along the track.

      Winner of the Grand Prix at Fredrikstad Animation Festival.
    `,
    credits: `
      Director: Sander Joon
      Sound: Sander Joon
      Production: Estonian Academy of Arts
    `,
    awards: `
      Grand Prix: Fredrikstad Animation Festival
      Best Debut: Prime The Animation
    `
  },
  {
    title: "Kultuurkapital Ident",
    year: "2023",
    videoUrl: "https://vimeo.com/783451233",
    aspectRatio: "16/9",
    tags: ["Commercial", "Commissioned"],
    description: `
      Animated seasonal ident for the Cultural Endowment of Estonia.
    `,
    credits: `
      Director & Animation: Sander Joon
      Client: Eesti Kultuurkapital
      Sound: Horret Kuus
    `
  },
  {
    title: "Misha Panfilov Sound Combo",
    year: "2021",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    aspectRatio: "16/9",
    tags: ["Music Video", "Animation"],
    description: `
      Official animated music video. Hand-drawn 2D animation with vintage risograph color treatment.
      <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80" alt="Music video still" />
    `,
    credits: `
      Director: Sander Joon
      Music: Misha Panfilov Sound Combo
      Label: Funk Night Records
    `
  },
  {
    title: "Loop Experiments & Tests",
    year: "2024",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    aspectRatio: "1/1",
    tags: ["Animation", "Personal"],
    description: `
      A collection of experimental animation loops exploring momentum, mechanical motion, and character distortion.
    `,
    credits: `
      Animation: Sander Joon
      Software: TVPaint, Blender
    `
  }
];
