const pages = document.querySelectorAll(".page");

const startBtn = document.getElementById("startBtn");
const startGameBtn = document.getElementById("startGameBtn");

const worldName = document.getElementById("worldName");
const worldText = document.getElementById("worldText");

const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const replyText = document.getElementById("replyText");

let currentWorld = null;
let qIndex = 0;

const SHEET_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

function saveResponse(question, answer, type) {
  fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      world: currentWorld.name,
      question,
      answer,
      type
    })
  }).catch(err => console.error("Sheet error", err));
}


/* ================= WORLDS ================= */

const worlds = {
  velarium: {
    name: "Velarium",
    intro: "Slow, quiet, a little personal.",
    questions: [
      {
        type: "mcq",
        q: "How do you usually feel about calm, quiet moments?",
        options: [
          { t: "I enjoy them", r: "That tells me you’re comfortable with stillness. Those moments can say more than noise ever could." },
          { t: "Only sometimes", r: "That makes sense. Quiet feels different depending on who you’re sharing it with." },
          { t: "Only with the right people", r: "I like that answer. The right presence can change everything." },
          { t: "I’m not sure", r: "That’s okay. Sometimes quiet reveals itself slowly." }
        ]
      },
      {
        type: "mcq",
        q: "When someone listens more than they talk, how does that feel?",
        options: [
          { t: "Comforting", r: "That’s nice to hear. Being heard properly is a rare kind of comfort." },
          { t: "Thoughtful", r: "I try to be that way. Listening feels like its own kind of closeness." },
          { t: "Depends on the vibe", r: "True. Silence only works when it feels safe." },
          { t: "I don’t notice much", r: "That’s fair. Not every moment needs to stand out." }
        ]
      },
      {
        type: "text",
        q: "What makes you feel comfortable around someone?",
        placeholder: "No pressure, just a thought…",
        r: "That actually says a lot. Comfort is never accidental."
      },
      {
        type: "mcq",
        q: "If I were quietly sitting next to you, what would you notice first?",
        options: [
          { t: "The vibe", r: "Vibes are subtle, but they linger. I like that you notice them." },
          { t: "The silence", r: "Silence can feel intimate when it’s shared." },
          { t: "The small details", r: "Those details usually mean more than people realize." },
          { t: "Nothing really", r: "Sometimes comfort means not needing to notice anything at all." }
        ]
      },
      {
        type: "mcq",
        q: "People sometimes say I’m…",
        options: [
          { t: "Easy to talk to", r: "I’m glad that comes across. Conversations matter to me." },
          { t: "Calm", r: "That’s probably true. Calm feels natural." },
          { t: "A little mysterious", r: "I don’t mind that. Some things are better discovered slowly." },
          { t: "Hard to read", r: "Maybe. But I think the right person would notice." }
        ]
      },
      {
        type: "text",
        q: "One thing you usually like in a person?",
        placeholder: "Could be anything…",
        r: "That’s a really good answer. It feels honest."
      },
      {
        type: "mcq",
        q: "If you had to pick one thing you might like about me…",
        options: [
          { t: "How you talk", r: "That means more than you think." },
          { t: "Your calm nature", r: "I like that you notice that." },
          { t: "Your effort", r: "I do try — especially here." },
          { t: "I’m still figuring it out", r: "That’s fair. I don’t mind being discovered slowly." }
        ]
      },
      {
        type: "mcq",
        q: "Spending quiet time together could feel…",
        options: [
          { t: "Comfortable", r: "Comfort is a really good place to start." },
          { t: "Natural", r: "That’s a feeling I trust." },
          { t: "Neutral", r: "That’s okay. Not everything has to rush." },
          { t: "Unexpectedly nice", r: "I like that possibility." }
        ]
      }
    ]
  },

  ludique: {
    name: "Ludique",
    intro: "Light energy. A little teasing.",
    questions: [
      {
        type: "mcq",
        q: "How do you usually react to playful teasing?",
        options: [
          { t: "I tease back", r: "I had a feeling you would. That kind of energy is fun." },
          { t: "I laugh", r: "That’s a good sign. Laughter makes everything easier." },
          { t: "I act unbothered", r: "Sure you do. But I’d probably notice anyway." },
          { t: "Depends on who it is", r: "That’s fair. Teasing only works with the right person." }
        ]
      },
      {
        type: "mcq",
        q: "What kind of plan sounds fun to you?",
        options: [
          { t: "Something spontaneous", r: "Spontaneity has its own kind of charm." },
          { t: "Something planned", r: "There’s something attractive about intention." },
          { t: "Something simple", r: "Simple plans usually leave the best memories." },
          { t: "Something familiar", r: "Familiar can feel surprisingly warm." }
        ]
      },
      {
        type: "text",
        q: "If I asked you out casually, what would you enjoy doing?",
        placeholder: "Coffee, walk, food…",
        r: "That actually sounds really nice. I can picture it."
      },
      {
        type: "mcq",
        q: "If we were laughing a lot, you’d probably think…",
        options: [
          { t: "This feels easy", r: "Easy is rare. That’s a good feeling." },
          { t: "This is fun", r: "Fun matters more than people admit." },
          { t: "This is unexpected", r: "Sometimes the best things are." },
          { t: "Nothing serious yet", r: "Fair. No need to rush labels." }
        ]
      },
      {
        type: "mcq",
        q: "People say I’m playful when I’m comfortable.",
        options: [
          { t: "That’s attractive", r: "Interesting… I’ll remember that." },
          { t: "That makes sense", r: "It really does." },
          { t: "I like that", r: "Good to know." },
          { t: "I’m not sure yet", r: "That’s okay. Time helps." }
        ]
      },
      {
        type: "text",
        q: "What usually makes someone fun to be around?",
        placeholder: "One thought is enough…",
        r: "That’s a really good way to look at it."
      },
      {
        type: "mcq",
        q: "If you had to tease me about something…",
        options: [
          { t: "Your calm vibe", r: "I get that a lot, actually." },
          { t: "Your focus", r: "Guilty — I can be intense." },
          { t: "Your seriousness", r: "Only until I’m comfortable." },
          { t: "I wouldn’t tease you", r: "That’s surprisingly sweet." }
        ]
      },
      {
        type: "mcq",
        q: "Spending time like this together feels…",
        options: [
          { t: "Light", r: "I like how that sounds." },
          { t: "Comfortable", r: "Comfort again — interesting." },
          { t: "Interesting", r: "I’ll take that." },
          { t: "Still figuring it out", r: "That honesty is nice." }
        ]
      }
    ]
  },

  parallax: {
    name: "Parallax",
    intro: "A little more honest now.",
    questions: [
      {
        type: "mcq",
        q: "What usually makes you interested in someone?",
        options: [
          { t: "Personality", r: "That’s something I really value too." },
          { t: "Consistency", r: "Consistency shows care." },
          { t: "Comfort", r: "Comfort feels underrated." },
          { t: "Time", r: "Time does reveal everything." }
        ]
      },
      {
        type: "mcq",
        q: "If you think about me for a second, what stands out?",
        options: [
          { t: "How you think", r: "That means a lot." },
          { t: "Your effort", r: "I’m glad it shows." },
          { t: "Your calmness", r: "That seems to come up often." },
          { t: "I’m not sure yet", r: "That’s okay. Curiosity counts." }
        ]
      },
      {
        type: "text",
        q: "What do you usually like in a person you’re getting to know?",
        placeholder: "Be honest…",
        r: "That actually says more than you realize."
      },
      {
        type: "mcq",
        q: "If this was the start of something…",
        options: [
          { t: "I’d take it slow", r: "Slow sounds good." },
          { t: "I’d be curious", r: "Curiosity brought us here." },
          { t: "I’d see where it goes", r: "That feels right." },
          { t: "I’m unsure", r: "Honesty matters." }
        ]
      },
      {
        type: "text",
        q: "One thing you think we might enjoy together?",
        placeholder: "Anything at all…",
        r: "That genuinely sounds nice."
      },
      {
        type: "mcq",
        q: "Right now, this feels…",
        options: [
          { t: "Interesting", r: "I’m glad it does." },
          { t: "Comfortable", r: "Comfort again — I like that pattern." },
          { t: "Unexpected", r: "Unexpected isn’t always bad." },
          { t: "Neutral", r: "That’s okay. No pressure." }
        ]
      },
      {
        type: "mcq",
        q: "If I asked you out after this…",
        options: [
          { t: "I’d think about it", r: "That’s fair. I appreciate honesty." },
          { t: "I’d be curious", r: "Curiosity again… interesting." },
          { t: "I’d want to talk more", r: "I’d like that too." },
          { t: "I’d see how I feel", r: "That sounds thoughtful." }
        ]
      }
    ]
  }
};

/* ================= FLOW ================= */

function showPage(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

startBtn.onclick = () => showPage("page-2");

document.querySelectorAll(".card").forEach(card => {
  card.onclick = () => {
    currentWorld = worlds[card.dataset.card];
    worldName.textContent = currentWorld.name;
    worldText.textContent = currentWorld.intro;
    showPage("page-3");
  };
});

startGameBtn.onclick = () => {
  showPage("page-4");
  setTimeout(() => {
    qIndex = 0;
    loadQuestion();
    showPage("page-5");
  }, 1800);
};

/* ================= RENDER ================= */

function loadQuestion() {
  replyText.textContent = "";
  replyText.classList.remove("show");
  optionsBox.innerHTML = "";

  const q = currentWorld.questions[qIndex];

  questionText.classList.add("question-out");

  setTimeout(() => {
    questionText.textContent = q.q;
    questionText.classList.remove("question-out");
  }, 300);

  optionsBox.classList.remove("fade-in");
  void optionsBox.offsetWidth;
  optionsBox.classList.add("fade-in");

  if (q.type === "mcq") {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<p class="card-text">${opt.t}</p>`;
      div.onclick = (e) => {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        e.currentTarget.classList.add("selected");
        handleAnswer(opt.r);
      };
      optionsBox.appendChild(div);
    });
  }

  if (q.type === "text") {
    const input = document.createElement("input");
    input.placeholder = q.placeholder;

    const btn = document.createElement("div");
    btn.className = "start";
    btn.textContent = "continue";

    btn.onclick = () => {
      if (input.value.trim()) handleAnswer(q.r);
    };

    optionsBox.appendChild(input);
    optionsBox.appendChild(btn);
  }
}

function handleAnswer(reply) {
  const q = currentWorld.questions[qIndex];
  saveResponse(q.q, reply, q.type);

  

  replyText.textContent = reply;
  setTimeout(() => replyText.classList.add("show"), 50);

  if (qIndex % 2 === 0) {
    document.body.classList.add("level-up");
    setTimeout(() => document.body.classList.remove("level-up"), 1200);
  }

  setTimeout(() => {
    qIndex++;
    if (qIndex < currentWorld.questions.length) {
      loadQuestion();
    } else {
      showPage("page-6");
    }
  }, 1400);
}



/* ================= FINAL VALENTINE YES (FIXED) ================= */

document.addEventListener("click", (e) => {
  const card = e.target.closest(".yes-card");
  if (!card) return;

  const finalReply = document.getElementById("finalReply");
  const pets = document.getElementById("cutePets");

  document.querySelectorAll(".yes-card").forEach(c =>
    c.classList.remove("selected")
  );
  card.classList.add("selected");

  if (card.dataset.yes === "soft") {
    finalReply.textContent =
      "That makes me smile more than it should. I’ll plan something nice for us. 💕";
  }

  if (card.dataset.yes === "bold") {
    finalReply.textContent =
      "I like your confidence. Guess I’ll have to make this date worth the obvious yes. 😌💘";
  }

  finalReply.classList.add("show");
  pets.classList.add("show");
});


