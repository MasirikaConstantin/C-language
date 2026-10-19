const lessons = [
    {
        file: "Bonjour.cs",
        title: "Premier programme",
        text: "Depuis C# 9, un programme console peut commencer directement par des instructions. Console.WriteLine écrit une ligne sur la sortie.",
        output: "Bonjour, C# !",
        code: `Console.WriteLine("Bonjour, C# !");`
    },
    {
        file: "Types.cs",
        title: "Types et var",
        text: "int, string, double et bool sont des types précis. var demande au compilateur de déduire le type : ici, ville reste un string. Rien n’est dynamique.",
        output: "Amina a 28 ans\nAdmis : True",
        code: `int age = 28;
string prenom = "Amina";
double note = 16.5;
bool admis = note >= 10;
var ville = "Lyon";

Console.WriteLine($"{prenom} a {age} ans");
Console.WriteLine($"Admis : {admis}");`
    },
    {
        file: "Decision.cs",
        title: "Décider avec if",
        text: "Les conditions testent une expression booléenne. Les accolades délimitent le bloc exécuté. Une seule branche est choisie.",
        output: "Très bien",
        code: `double note = 16.5;

if (note >= 16)
{
    Console.WriteLine("Très bien");
}
else if (note >= 10)
{
    Console.WriteLine("Admis");
}
else
{
    Console.WriteLine("À retravailler");
}`
    },
    {
        file: "Boucle.cs",
        title: "Parcourir avec foreach",
        text: "Le tableau est écrit avec une expression de collection, disponible depuis C# 12. foreach visite chaque élément une fois.",
        output: "Types\nClasses\nLINQ",
        code: `string[] modules = ["Types", "Classes", "LINQ"];

foreach (string module in modules)
{
    Console.WriteLine(module);
}`
    },
    {
        file: "Methode.cs",
        title: "Une méthode",
        text: "Une méthode nomme un calcul réutilisable. La flèche => convient quand le corps tient en une expression. Doubler(21) renvoie 42.",
        output: "42",
        code: `static int Doubler(int n) => n * 2;

Console.WriteLine(Doubler(21));`
    },
    {
        file: "Livre.cs",
        title: "Une classe",
        text: "Livre regroupe un titre, un auteur et une façon de se décrire. Les propriétés Titre et Auteur sont lisibles de l’extérieur. Le constructeur les remplit.",
        output: "L’Étranger — Camus",
        code: `var livre = new Livre("L’Étranger", "Camus");
Console.WriteLine(livre);

class Livre
{
    public string Titre { get; }
    public string Auteur { get; }

    public Livre(string titre, string auteur)
    {
        Titre = titre;
        Auteur = auteur;
    }

    public override string ToString() => $"{Titre} — {Auteur}";
}`
    },
    {
        file: "Notes.cs",
        title: "Filtrer avec LINQ",
        text: "Where garde les notes d’au moins 10. OrderByDescending les trie de la plus haute à la plus basse. Dans un projet moderne, System.Linq est déjà importé.",
        output: "17\n15\n12",
        code: `int[] notes = [12, 8, 17, 15, 9];

var reussies = notes
    .Where(n => n >= 10)
    .OrderByDescending(n => n);

foreach (int n in reussies)
{
    Console.WriteLine(n);
}`
    },
    {
        file: "Async.cs",
        title: "Attendre sans bloquer",
        text: "async marque une méthode qui peut attendre. await suspend le texte jusqu’au résultat, puis le programme continue. Le délai ici est simulé.",
        output: "Chapitre chargé",
        code: `string texte = await LireAsync();
Console.WriteLine(texte);

static async Task<string> LireAsync()
{
    await Task.Delay(200);
    return "Chapitre chargé";
}`
    }
];

const questions = [
    {
        prompt: "Que rappelle le symbole # dans le nom du langage ?",
        choices: [
            "Un raccourci de Visual Studio",
            "Le dièse musical, un demi-ton au-dessus de la note",
            "Le nombre de fichiers obligatoires dans un projet",
            "Une ancienne version interne appelée channel 4"
        ],
        answer: 1,
        why: "C# se lit « C sharp ». Le dièse élève une note d’un demi-ton, sur le même principe que C++ qui « incrémente » C."
    },
    {
        prompt: "Quelle différence faut-il garder entre C# et .NET ?",
        choices: [
            "C# est le langage, .NET est la plateforme qui l’exécute",
            "C# est un éditeur, .NET est un système d’exploitation",
            "Les deux noms désignent exactement le même outil",
            ".NET est un langage plus ancien que C#"
        ],
        answer: 0,
        why: "On écrit le programme en C#. Les bibliothèques et le runtime viennent de .NET."
    },
    {
        prompt: "Que fait le mot-clé var ?",
        choices: [
            "Il crée une valeur sans type, modifiable librement",
            "Il désactive la vérification du compilateur",
            "Il demande au compilateur de déduire un type fixe",
            "Il réserve le nom pour une variable globale"
        ],
        answer: 2,
        why: "var ville = \"Lyon\" reste un string. Le type est décidé à la compilation, il n’est simplement pas répété."
    },
    {
        prompt: "À quoi sert await ?",
        choices: [
            "À trier une collection",
            "À reprendre le code quand une opération asynchrone a fini",
            "À déclarer une classe abstraite",
            "À libérer la mémoire à la main"
        ],
        answer: 1,
        why: "await s’emploie dans une méthode async. La suite s’exécute quand le résultat de l’opération est prêt."
    }
];

const keywords = new Set([
    "abstract", "as", "async", "await", "base", "bool", "break", "case",
    "catch", "class", "const", "continue", "default", "do", "double", "else",
    "enum", "false", "finally", "for", "foreach", "get", "if", "in", "init",
    "int", "interface", "internal", "is", "new", "null", "out", "override",
    "params", "private", "protected", "public", "readonly", "record", "ref",
    "return", "sealed", "set", "static", "string", "struct", "switch", "this",
    "true", "try", "using", "var", "void", "when", "while", "yield"
]);

function highlight(code, target) {
    target.replaceChildren();
    const token = /\s+|\/\/.*|"(?:\\.|[^"\\])*"|\$?"(?:\\.|[^"\\])*"|@?"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?|\b[A-Za-z_]\w*\b|./g;
    let match;

    while ((match = token.exec(code)) !== null) {
        const text = match[0];
        if (/^\s+$/.test(text) || (/^[^A-Za-z0-9_"]+$/.test(text) && !text.startsWith("//") && !text.startsWith('$"') && !text.startsWith('@"'))) {
            target.append(text);
            continue;
        }

        const span = document.createElement("span");
        span.textContent = text;

        if (text.startsWith("//")) {
            span.className = "cmt";
        } else if (text.startsWith('"') || text.startsWith('$"') || text.startsWith('@"')) {
            span.className = "str";
        } else if (/^-?\d/.test(text)) {
            span.className = "num";
        } else if (keywords.has(text)) {
            span.className = "kw";
        } else if (/^[A-Z]/.test(text)) {
            const rest = code.slice(token.lastIndex);
            span.className = /^\s*\(/.test(rest) ? "fn" : "typ";
        }

        target.append(span);
    }
}

function renderLessons() {
    const list = document.getElementById("lesson-list");
    const code = document.getElementById("code-view");
    const title = document.getElementById("lesson-title");
    const text = document.getElementById("lesson-text");
    const output = document.getElementById("lesson-output");
    const fileName = document.getElementById("file-name");

    lessons.forEach((lesson, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.role = "tab";
        button.id = `lesson-tab-${index}`;
        button.textContent = lesson.title;
        button.setAttribute("aria-selected", index === 0 ? "true" : "false");
        button.setAttribute("aria-controls", "code-view");
        button.addEventListener("click", () => show(index));
        list.append(button);
    });

    function show(index) {
        const lesson = lessons[index];
        [...list.children].forEach((button, i) => {
            button.setAttribute("aria-selected", i === index ? "true" : "false");
        });
        fileName.textContent = lesson.file;
        title.textContent = lesson.title;
        text.textContent = lesson.text;
        output.textContent = lesson.output;
        highlight(lesson.code, code);
    }

    show(0);
}

function renderQuiz() {
    const form = document.getElementById("quiz-form");
    const score = document.getElementById("quiz-score");
    const picked = new Array(questions.length).fill(null);

    questions.forEach((question, index) => {
        const card = document.createElement("fieldset");
        card.className = "question";

        const legend = document.createElement("h3");
        legend.textContent = `${index + 1}. ${question.prompt}`;
        card.append(legend);

        const options = document.createElement("div");
        options.className = "options";

        question.choices.forEach((choice, choiceIndex) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = choice;
            button.addEventListener("click", () => choose(index, choiceIndex, options));
            options.append(button);
        });

        const why = document.createElement("p");
        why.className = "why";
        why.hidden = true;

        card.append(options, why);
        form.append(card);
    });

    function choose(index, choiceIndex, options) {
        if (picked[index] !== null) {
            return;
        }

        picked[index] = choiceIndex;
        const correct = choiceIndex === questions[index].answer;
        [...options.children].forEach((button, i) => {
            button.disabled = true;
            if (i === questions[index].answer) {
                button.classList.add("good");
            } else if (i === choiceIndex) {
                button.classList.add("bad");
            }
        });

        const why = options.nextElementSibling;
        why.hidden = false;
        why.textContent = correct
            ? questions[index].why
            : `Réponse attendue : ${questions[index].choices[questions[index].answer]}. ${questions[index].why}`;

        const done = picked.filter((value) => value !== null).length;
        const hits = picked.filter((value, i) => value === questions[i].answer).length;
        const label = hits === 0
            ? "Aucune bonne réponse"
            : hits === 1
                ? "1 bonne réponse"
                : `${hits} bonnes réponses`;
        score.textContent = done === questions.length
            ? `${hits} sur ${questions.length}`
            : `${label} pour l’instant`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    renderQuiz();
});
