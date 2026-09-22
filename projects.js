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
 * - autoplayThumbnail (boolean, optional): Set to true to autoplay the thumbnail preview and keep it playing when not hovering
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
      <p>📌 Hei! I'm a film director and animator based in Estonia. Get in touch!</p>
      <i><p><a href="mailto:sander.joon@gmail.com">sander.joon@gmail.com</a> / <a href="https://www.instagram.com/sanderjoon/">Instagram</a> / <a href="https://docs.google.com/document/d/1Hi_yvdrPqwd7v-gbUWIhDkpgFimJlm9dMqAGZVh70uQ/edit?usp=sharing">CV</a></p></i>
    `
  },
  {
    title: "📌 Sierra 🚗💨💨💨",
    pinned: true,
    autoplayThumbnail: true,
    doubleWidth: true,
    year: "2022",
    videoUrl: "https://vimeo.com/1035359933",
    thumbnailUrl: "thumbs/sierra_thumb.mp4",
    aspectRatio: "16/9",
    tags: ["Films"],
    description: `
    <p>An <b>Oscars Shortlisted</b> short animation</p>
    <p>Parents often push their children to follow their steps. In this case, the father's obsession with rally turns the kid into a car tire. Loosely inspired by the director's childhood, Sierra takes us into the surreal car racing world.</p>

      <table-box title="Credits">
        Director: Sander Joon
        Stop-Motion Animation from 1980: Heikki Joon
        Producers: Erik Heinsalu & Aurelia Aasa
        Animation: Sander Joon, Henri Veermäe, Valya Paneva, Teresa Baroet
        Background Artist: Hleb Kuftseryn
        Sound: Matis Rei
        Music: Misha Panfilov
        Production: AAA Creative & BOP Animation
        Distribution: Square Eyes
        Runtime: 16 min
        Year: 2022
      </table-box>

      <table-box title="Selections & Awards">
        Premiered: Clermont-Ferrand Short Film Festival
        Shortlisted: 95th Academy Awards
        Test Screening Award: Riga IFF Forum
        Special Mention: Glasgow SFF
        Special Mention: Ismailia International Film Festival
        ARTE Short Film Prize: Filmfest Dresden
        Youth jury’s Special Mention: Filmfest Dresden
        Best Baltic Short: 2Annas ISFF
        Best Animated Short: San Francisco International Film Festival
        Special Mention: Anibar International Animation Festival
        Audience Award: GLAS Animation Festival
        Best International Animation: Animatricks
        Golden Prize: GwangHwaMun International Short Film Festival
        Second Award: Short Waves Festival
        Best of The Festival: Palm Springs ShortFest
        Best Animation: Desertscape International Film Festival
        Best Short: Valencia International Film Festival, Cinema Jove
        Grand Prix: Countryside Animafest Cyprus
        Best Professional Animation: Turku Animated Film Festival
        Audience Award: Turku Animated Film Festival
        New Talent Award: Fantoche International Animation Film Festival
        Best Animation Award: Orvieto Cinema Fest 2022
        Second International Award: Lille International Short Film Festival
        Wacom Public Prize: Ottawa International Animation Festival
        Special mention from the audience: Galician Freaky Film Festival
        Best International Animated Short: Cinekid Festival
        Best First Film: Primanima
        PrimAlter Award: Primanima
        PrimaSound Special Mention: Primanima
        Most Popular International Short film: Primanima
        Special Mention for Animated Encounters: Encounters Film Festival
        Best Short Award: Viborg Animation Festival
        Grand Prix Award: Fredrikstad Animation Festival
        Special Mention: Kaohsiung Film Festival
        1st Mention: Bit Bang Fest
        Jury Citation: Sweaty Eyeballs Animation Festival
        Grand Jury Prize for Animated Short: AFI Fest
        Main Short Film Prize: Ljubljana International Film Festival
        Best Animation Award: Still Voices Film Festival
        Jury Mention in National Competition: PÖFF Shorts
        Best International Short Film: exground Filmfest
        Best Film Byteen Award: Lobo Fest
        Audience Award: Animateka
        Jury Grand Prix: Animateka
        Best International Animated Short Film: ÍCARO International Film Festival
      </table-box>
    `
  },
  {
    title: "Sounds Good",
    year: "2018",
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
    year: "2017",
    videoUrl: "https://www.youtube.com/watch?v=z5KUJnEhqwE",
    thumbnailUrl: "https://i3.ytimg.com/vi/z5KUJnEhqwE/maxresdefault.jpg",
    aspectRatio: "2.35/1",
    tags: ["Films"],
    description: `
    <p>There are some things we understand just naturally, and again some that we can't understand no matter how hard we try.</p>
    `
  },
  {
  title: "Velodrool",
    year: "2015",
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
  },
  {
  title: "Anibar 2023",
    year: "2023",
    videoUrl: "https://www.youtube.com/watch?v=XE0mG5kOy3A",
    thumbnailUrl: "https://i3.ytimg.com/vi/XE0mG5kOy3A/maxresdefault.jpg",
    aspectRatio: "16/9",
    tags: ["Work"],
    description: `
      <video style="aspect-ratio: auto;" controls loop><source src="https://freight.cargo.site/m/U1644734105736033001051027703416/Recording-2023-06-05-160433.mp4" type="video/mp4"></video>
    `
  },
  {
    title: "Zubroffka 18",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=SATFGYADANA",
    thumbnailUrl: "https://img.youtube.com/vi/SATFGYADANA/maxresdefault.jpg",
    aspectRatio: "16/9",
    tags: ["Work"],
    description: `<p>Intro for ZubrOFFka - International Short Film Festival</p>
    <p>Since it’s the festival’s 18th edition, the festival team cleverly chose the theme of coming-of-age. My goal was to be playful and highlight the common themes of puberty, changes, and finding one’s path.</p>
    <table-box title="Credits">
    Music & Sound Design: Luurel Varas
    Typography Design: Izabela Sroka
    Year: 2024
    </table-box>
    `
  },
  {
    title: "",
    tags: ["Work"],
    year: "2024",
    aspectRatio: "9/16",
    autoplayThumbnail: true,
    videoUrl: "https://freight.cargo.site/m/E1953389295545177320647768442488/20240815_Animation_v0003_rgb-low.mp4",
    thumbnailUrl: "https://freight.cargo.site/m/E1953389295545177320647768442488/20240815_Animation_v0003_rgb-low.mp4"
  },
  {
    title: "Wild South",
    tags: ["Work"],
    year: "2024",
    aspectRatio: "16/9",
    videoUrl: "https://freight.cargo.site/m/G1757011326137588248679707377539/Tartudok2024-Mont-4mbps-v2.mp4",
    thumbnailUrl: "thumbs/wild_south.mp4"
  },
  {
    title: "HULU ID",
    tags: ["Work"],
    year: "2023",
    aspectRatio: "16/9",
    videoUrl: "https://www.youtube.com/watch?v=xlNhoJVtHF4",
    thumbnailUrl: "https://img.youtube.com/vi/xlNhoJVtHF4/maxresdefault.jpg",
    description: `<p>Titmouse invited me to create a food-related ID for HULU. So I made pancakes 🥞</p>
    `
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=g7KOVo5Lp2Y",
    tags: ["Play"],
    year: "2024"
  },
  {
    title: "Bluescape",
    tags: ["Work"],
    year: "2022",
    aspectRatio: "141/100",
    thumbnailUrl: "./videos/bluescape.mp4",
    videoUrl: "./videos/bluescape.mp4"
  },
  {
    title: "The Old Man Movie 2D Cut-Out",
    videoUrl: "https://www.youtube.com/watch?v=hcKfDRNdNJI",
    aspectRatio: "16/9",
    tags: ["Work"],
    year: "2019",
    description: `<p>I was responsible for the 2D digital cut-out sequences in the feature film <a href="https://letterboxd.com/film/the-old-man-movie/" target="_blank">The Old Man Movie</a> (2019)
</p>`
  },
  {
    videoUrl: "https://vimeo.com/91870957",
    year: "2014",
    tags:["Play"]
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=qml7rSiT_2Q",
    year: "2025",
    tags:["Play"]
  },
  {
    title:"Bænkevarmer",
    description: `<p>My final assignment for <a href="https://animationworkshop.via.dk/programmes-and-courses/professional-training-courses/3d-character-animation" target="_blank">3D Character Animation professional course in The Animation Workshop</a>. I set the goal for myself to create a character, animate him, and make him interact with an object. All within a few weeks.</p>

    <p>Inspired by Jacques Tati’s „Playtime“, I decided to create a character who acts in a more subtle manner. For the second part of the film, I wanted to go all out on physical movements of the whole body to get experience in animating a character running, trying to hold balance and tackle with some object.<p>
    
    <table-box>
    Animated in: Maya
    Rendered in: Blender's EEVEE
    Sound Design made with: Renoise
    Character rigged with: mGear Framework
    Year: 2019
    </table-box>`,
    videoUrl:"https://www.youtube.com/watch?v=bk48fs2NJsQ",
    tags:["Play"]
  },
  {
    title:"Seagulls of Eden",
    aspectRatio: "16/9",
    imageUrl:"images/soe_9.jpg",
    thumbnailUrl:"images/soe_9.jpg",
    description:"A Feature Film in Progress.",
    year:"2026",
    tags:["Films"]
  }

  ];
