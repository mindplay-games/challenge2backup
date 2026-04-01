
const CHALLENGES = [
  /* ======================
     BASICS (ללא שינוי)
     ====================== */

  {
    id: "cmd_print_name",
    group: "basics",
    topic: "פקודה",
    title: "הדפס שלום",
    subtitle: "print בפייתון",
    explain: "פקודה היא הוראה למחשב. בפייתון מדפיסים למסך עם print().",
    task: 'כתוב שורה אחת שמדפיסה את המילה "שלום".',
    hint: 'הטקסט שבתוך הפרינט יהיה מוקף ב"גרשיים" ובסוגריים() לא לשכוח לא לעשות רווחים מיותרים לפני הפקודה',
    starter: ``,
    solution: `print("שלום")`,
    expectedOutput: "שלום",
    fallback: {
      type: "quiz",
      question: 'איזו שורה מדפיסה בפייתון את המילה "שלום"?',
      options: ['echo("שלום")', 'print("שלום")', 'console.log("שלום")', 'say("שלום")'],
      correctIndex: 1,
      explainCorrect: 'בפייתון מדפיסים עם print() והטקסט בתוך גרשיים.'
    }
  },

  {
    id: "var_zoo_total",
    group: "basics",
    topic: "משתנים",
    title: "גן חיות עם משתנים",
    subtitle: "3 משתנים + סכום",
    explain: "משתנה הוא קופסה בזיכרון עם שם. אפשר לשמור בו מספרים, מילים ועוד",
    task: "בקוד למטה מופיעים 3 משתנים כל משתנה שומר על מספר החיות (אריות, קופים, פילים) - המשימה שלכם היא ליצור משתנה חדש שבתוכו נסכום את מספר כל החיות בגן ולאחר מכן נדפיס את המספר שיצא",
    hint: "total = lions + monkeys + elephants  ---- print(total)",
    starter: `lions = 5
monkeys = 12
elephants = 2`,
    solution: `lions = 5
monkeys = 12
elephants = 2
total = lions + monkeys + elephants
print(total)`,
    expectedOutput: "19",
    fallback: {
      type: "quiz",
      question: "מה זה משתנה בפייתון?",
      options: ["כפתור באתר", "קופסה עם שם ששומרת מידע", "שגיאה בקוד", "לולאה שחוזרת"],
      correctIndex: 1,
      explainCorrect: "משתנה הוא קופסה בזיכרון: נותנים שם ושומרים ערך."
    }
  },

  {
    id: "input_basic_name",
    group: "basics",
    topic: "קלט",
    title: "קלט שם",
    subtitle: "input() + print()",
    explain: "input() קולט טקסט שהמשתמש מקליד. נשמור את הטקסט במשתנה ואז נדפיס אותו.",
    task: "צרו משתנה בשם name ושמרו בו את הקלט מהפקודה input(). לאחר מכן הדפיסו 'שלום' ולאחריו את הערך של המשתנה.",
    hint: 'שמור את הקלט מה־input() במשתנה, ואז הדפס את המילה "שלום" יחד עם המשתנה בעזרת print().',
    starter: ``,
    solution: `name = input("מה השם שלך? ")
print("שלום", name)`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה עושה input() בפייתון?",
      options: [
        "מדפיס למסך",
        "קורא קלט מהמשתמש ומחזיר אותו",
        "מוחק משתנים",
        "עוצר את המחשב"
      ],
      correctIndex: 1,
      explainCorrect: "input() מחכה שהמשתמש יקליד ומחזיר את הטקסט."
    }
  },

  {
    id: "for_5_rounds",
    group: "basics",
    topic: "לולאת for",
    title: "5 סיבובים",
    subtitle: "הדפס 1 עד 5",
    explain: "לולאת for עושה מספר חזרות ידוע מראש. range(1,6) נותן 1 עד 5.",
    task: "צור לולאת for שמדפיסה את המספרים 1 עד 5.",
    hint: "for i in range(1, 6): ואז print(i)",
    starter: ``,
    solution: `for i in range(1, 6):
    print(i)`,
    expectedOutput: `1
2
3
4
5`,
    fallback: {
      type: "order",
      prompt: "סדר את השורות כדי ליצור לולאת for שמדפיסה 1 עד 5",
      pieces: ["    print(i)", "for i in range(1, 6):"],
      correct: ["for i in range(1, 6):", "    print(i)"],
      explainCorrect: "קודם שורת for עם :, ואז שורה מוזחת (4 רווחים) עם print."
    }
  },

  {
    id: "while_points_to_5",
    group: "basics",
    topic: "לולאת while",
    title: "נקודות עד 5",
    subtitle: "while",
    explain: "לולאת while חוזרת כל עוד תנאי מסוים מתקיים, וכשהתנאי כבר לא נכון — הלולאה נעצרת.",
    task: "יש לנו משתנה בשם points שמתחיל בערך 0. כתבו לולאת while שמגדילה את הערך של points ב־1 בכל סיבוב ומדפיסה את הערך שלו בכל פעם, והלולאה תמשיך לרוץ כל עוד points קטן מ־5 ותיעצר כשהוא יגיע ל־5.",
    hint: "while points < 5: ואז בפנים points = points + 1 ואז print(points)",
    starter: `points = 0

# כתבו לולאת while כאן:

`,
    solution: `points = 0

while points < 5:
    points = points + 1
    print(points)`,
    expectedOutput: `1
2
3
4
5`,
    fallback: {
      type: "order",
      prompt: "סדרו את השורות כדי ליצור לולאת while שמדפיסה 1 עד 5",
      pieces: [
        "    print(points)",
        "    points = points + 1",
        "while points < 5:",
        "points = 0"
      ],
      correct: [
        "points = 0",
        "while points < 5:",
        "    points = points + 1",
        "    print(points)"
      ],
      explainCorrect: "קודם מאתחלים points, ואז while עם :, ואז שתי שורות מוזחות (4 רווחים)."
    }
  },

  {
    id: "if_bigger_than_10_write",
    group: "basics",
    topic: "תנאים",
    title: "כתבו תנאי לבד",
    subtitle: "if >",
    explain: "תנאים הם דרך להגיד למחשב: אם משהו קורה – תעשה כך, ואם לא – תעשה משהו אחר",
    task: "בקוד שלפניכם יצרנו משתנה בשם number עם הערך 7. עליכם לכתוב תנאי: אם number גדול מ־10 הדפיסו גדול, ואם number קטן מ־10 הדפיסו קטן.",
    hint: "צרו תנאי if שבודק האם המספר גדול מ־10 — אם כן, הדפיסו גדול. מתחתיו צרו תנאי נוסף שבודק האם המספר קטן מ־10 — אם כן, הדפיסו קטן.",
    starter: `number = 7

# כתבו כאן:

# אם number גדול מ-10 הדפיסו "גדול"

# אם number קטן מ-10 הדפיסו "קטן"
`,
    solution: `number = 7

if number > 10:
    print("גדול")
if number < 10:
    print("קטן")`,
    expectedOutput: "קטן",
    fallback: {
      type: "quiz",
      question: "איזו שורה מתחילה תנאי if בפייתון?",
      options: [
        "if (x > 10) {",
        "if x > 10:",
        "if x > 10 then",
        "if x => 10:"
      ],
      correctIndex: 1,
      explainCorrect: "בפייתון כותבים if בלי סוגריים, עם : בסוף השורה."
    }
  },
 {
    id: "if_and_else_1",
    group: "basics",
    topic: "תנאים",
    title: "כתבו תנאי לבד",
    subtitle: "if / else עם >",
    explain: "תנאים הם דרך להגיד למחשב: אם משהו קורה — תעשה כך, ואם לא — תעשה משהו אחר. בעזרת if אנחנו בודקים את התנאי, ו־else אומרת למחשב מה לעשות אם התנאי לא נכון.",
    task: "לפניכם משתנה בשם name עם הערך 'tal'. אם name שווה ל־'may' הדפיסו 'נכון', אחרת הדפיסו 'כתוב פה שם אחר'.",
    hint: "צרו תנאי שבודק אם ערך המשתנה name == 'מאי' — אז הדפיסו 'נכון'. לאחר מכן צרו את פקודת else שבודקת את ההפך מהתנאי, כלומר אם המשתנה name שונה מ־'מאי' — הדפיסו 'כתוב פה שם אחר'.",
    starter: `name = "tal"
  
    #כתבו את התנאים כאן מתחת

`,
    solution: `name = "tal"

if name == "may":
    print("נכון")
else:
    print("כתוב פה שם אחר")`,
    expectedOutput: "כתוב פה שם אחר",
    fallback: {
      type: "quiz",
      question: "איזו שורה מתחילה תנאי if בפייתון?",
      options: [
        "if (x > 10) {",
        "if x > 10:",
        "if x > 10 then",
        "if x => 10:"
      ],
      correctIndex: 1,
      explainCorrect: "בפייתון כותבים if בלי סוגריים, עם : בסוף השורה."
    }
  },
  {
    id: "func",
    group: "basics",
    topic: "פונקציות",
    title: "פונקציה שמדפיסה שלום",
    subtitle: "def greet()",
    explain: "פונקציה אורזת כמה פעולות תחת שם אחד, ומאפשרת להפעיל את כולן בפקודה אחת במקום לכתוב את הקוד מחדש בכל פעם.",
    task: "צור פונקציה greet שמדפיסה 'שלום'. ואז קרא לה .",
    hint: "מגדירים פונקציה בשם greet() — ובתוכה שמים פקודת print שמדפיסה שלום.",
    starter: `# כתבו כאן פונקציה ואז קריאה אליה:`,
    solution: `def greet():
    print("שלום")

greet()`,
    expectedOutput: "שלום",
    fallback: {
      type: "quiz",
      question: "מה היתרון של פונקציה?",
      options: ["היא עושה את המחשב יותר כבד", "אפשר להשתמש בקוד שוב ושוב בלי לשכפל", "היא מוחקת משתנים", "היא רק ללולאות"],
      correctIndex: 1,
      explainCorrect: "פונקציה חוסכת כתיבה כפולה ועוזרת לסדר קוד."
    }
  },

{
  id: "func_greet",
  group: "basics",
  topic: "פונקציות",
  title: "פרמטרים בפונקציות",
  subtitle: "פרמטר = מקום ריק שמקבל ערך",
  explain:
     "🔹 פונקציה היא פעולה שמפעילים בקוד.\n\n" +
         "🔹 לפעמים הפונקציה צריכה מידע כדי לעבוד. למידע הזה קוראים פרמטר.\n\n" +
         "🔹 את הפרמטר כותבים כשמגדירים פונקציה:\n" +
         "`def greet(name):`\n\n" +
         "🔹 וכשמפעילים את הפונקציה — שולחים ערך:\n" +
         "`greet('יוסי')`",
  task:  "משימה\n\n" +
      "• כתבו פונקציה בשם `greet` שמקבלת `name`.\n\n" +
      "• בתוך הפונקציה הדפיסו: `'שלום ' + name`.\n\n" +
      "• הפעילו את הפונקציה פעמיים:\n" +
      "  - עם השם דנה\n" +
      "  - עם השם יוסי \n\n",
  hint:
    "זכרו:\n" +
    "פרמטר כותבים כשמגדירים פונקציה: def greet(name):\n" +
    "ערך שולחים כשקוראים לפונקציה: greet('יוסי')\n",
  starter: `# 1) הגדירו פונקציה greet שמקבלת name

# 2) הדפיסו בתוך הפונקציה: שלום <name>

# 3) קראו לפונקציה פעמיים עם שני שמות

`,
  solution: `def greet(name):
    print("שלום", name)

greet("יוסי")
greet("דנה")`,
  expectedOutput: `שלום יוסי
שלום דנה`,
  fallback: {
    type: "quiz",
    question: "מה זה פרמטר בפונקציה?",
    options: [
      "שם של משחק",
      "קופסה ריקה שמקבלת ערך כשקוראים לפונקציה",
      "כפתור שמכבה את המחשב",
      "סוג של לולאה"
    ],
    correctIndex: 1,
    explainCorrect:
      "פרמטר הוא שם בתוך הסוגריים של הפונקציה. כשקוראים לפונקציה שולחים לו ערך."
  }
},

  {
    id: "input_add_two_numbers",
    group: "basics",
    topic: "קלט",
    title: "חיבור שני מספרים",
    subtitle: "int(input()) + print()",
    explain: "input() מחזיר תמיד טקסט, לכן ממירים אותו למספר בעזרת int(), ואז אפשר לקלוט שני מספרים, לחבר ביניהם ולהדפיס את התוצאה",
    task: "קבלו מהמשתמש שני מספרים (שלמים), חשבו את הסכום, והדפיסו את הסכום בלבד.",
    hint: "נקלוט מספר למשתנה a בעזרת int(input(...)), לאחר מכן נקלוט מספר נוסף למשתנה b, ולבסוף נדפיס את סכום המספרים בעזרת print(a + b).",
    starter: `#קלטו מספר ראשון 
    
    #קלטו מספר שני 
   
    #הדפיסו חיבור בין המספרים
    
    `,
    solution: `a = int(input("מספר ראשון: "))
b = int(input("מספר שני: "))
print(a + b)`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "למה משתמשים ב-int(input()) בתרגיל הזה?",
      options: [
        "כדי להפוך את המספר לטקסט",
        "כדי להפוך טקסט למספר ואז אפשר לחבר",
        "כדי להדפיס מהר יותר",
        "כדי ליצור לולאה"
      ],
      correctIndex: 1,
      explainCorrect: "input() מחזיר טקסט, ו-int() הופך אותו למספר שאפשר לעשות עליו חיבור."
    }
  },

  {
    id: "input_age_plus_one",
    group: "basics",
    topic: "קלט",
    title: "הגיל בעוד שנה",
    subtitle: "int(input()) + חישוב",
    explain: "input() קורא קלט מהמשתמש. כדי לחשב עם מספרים צריך להפוך את הקלט למספר בעזרת int().",
    task: "קבלו מהמשתמש את הגיל שלו, חשבו מה יהיה הגיל בעוד שנה, והדפיסו את התוצאה.",
    hint: "age = int(input(...)) ואז print(age + 1)",
    starter: ` #הדפיסו - מה הגיל שלך
    
    #age צרו משתנה בשם
    
    #input המשתנה ישמור על פקודת 
   
   #הדפיסו את הערך של המשתנה של הגיל + 1
   `,
    solution: `age = int(input("מה הגיל שלך? "))
print(age + 1)`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "למה משתמשים ב-int(input()) בתרגיל הזה?",
      options: [
        "כדי להפוך טקסט למספר שאפשר לחשב איתו",
        "כדי להדפיס טקסט",
        "כדי לעצור את הקוד",
        "כדי להפעיל לולאה"
      ],
      correctIndex: 0,
      explainCorrect: "input() מחזיר טקסט, ו-int() הופך אותו למספר שאפשר להוסיף לו 1."
    }
  },

  {
    id: "time_sleep_basic",
    group: "basics",
    topic: "ספריית time",
    title: "טיימר קצר",
    subtitle: "time.sleep()",
    explain: "הספרייה time מאפשרת לנו לעבוד עם זמן. הפונקציה sleep() עוצרת את התוכנית למספר שניות ואז ממשיכה.",
    task: "ייבאו את ספריית time. הדפיסו 'מתחילים', חכו 1 שנייה עם time.sleep(1), ואז הדפיסו 'סיימנו'.",
    hint: "import time ואז time.sleep(1)",
    starter: `import time
   
    #הדפיסו - מתחילים
   
    #עצרו לשנייה אחת
 
    #הדפיסו סיימנו
    
    `,
    solution: `import time

print("מתחילים")
time.sleep(1)
print("סיימנו")`,
    expectedOutput: `מתחילים
סיימנו`,
    fallback: {
      type: "quiz",
      question: "מה עושה time.sleep(2)?",
      options: [
        "מדפיס 2 למסך",
        "מחכה 2 שניות ואז ממשיך",
        "מוחק משתנים",
        "עושה לולאה 2 פעמים"
      ],
      correctIndex: 1,
      explainCorrect: "sleep עוצרת את התוכנית למספר שניות ואז ממשיכה."
    }
  },

  {
    id: "time_stopwatch_basic",
    group: "basics",
    topic: "ספריית time",
    title: "סטופר קטן",
    subtitle: "time.time() + sleep()",
    explain: "בעזרת פקודת time.time() אפשר למדוד זמן בשניות, ואם שומרים זמן התחלה וזמן סיום אפשר לחשב כמה זמן עבר",
    task: "ייבאו את הספרייה time, שמרו את זמן ההתחלה, הדפיסו – מתחילים, המתינו 2 שניות, שמרו את זמן הסיום, חשבו את משך הזמן שחלף והדפיסו – עברו X שניות (בעיגול בעזרת פקודת int).",
    hint: "חשבו את הזמן שעבר על-ידי חיסור זמן ההתחלה מזמן הסיום, שמרו אותו במשתנה, ואז הדפיסו את מספר השניות שעברו בעיגול לספרה אחת",
    starter: `import time

start = time.time()
#הדפיסו - מתחילים

#חכו 2 שניות

#שמרו במשתנה חדש שוב את הזמן הנוכחי

#צרו משתנה נוסף - בתוכו תחסרו בין הזמן הנוכחי לזמן ההתחלה

#int הדפיסו את המשתנה אל תשכחו לעגל אותו עם

`,
    solution: `import time

start = time.time()
print("מתחילים")
time.sleep(2)
end = time.time()

timePass = end - start
print("עברו:", int(timePass), "שניות")`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "למה עושים end - start?",
      options: [
        "כדי לקבל את הזמן שנשאר",
        "כדי לקבל כמה זמן עבר בין ההתחלה לסוף",
        "כדי להדפיס את השעה",
        "כדי להפעיל sleep"
      ],
      correctIndex: 1,
      explainCorrect: "חיסור של זמן סוף פחות זמן התחלה נותן כמה שניות עברו."
    }
  },

  {
    id: "float_to_int_sum",
    group: "basics",
    topic: "עיגול מספרים עשרוניים",
    title: "חיבור עשרוניים למספר שלם",
    subtitle: "int()",
    explain: "int() פקודה שהופכת מספר עשרוני למספר שלם ",
    task: "בקוד מופיע המשתנה number. הפכו אותו למספר שלם והדפיסו אותו.",
    hint: "int(number)",
    starter: `number = 5.3`,
    solution: `print (int(number))`,
    expectedOutput: "5",
    fallback: {
      type: "quiz",
      question: "באיזו פקודה משתמשים כדי להפוך מספר כמו \"3.14\" למספר שלם?",
      options: ["int()", "float()", "str()", "print()"],
      correctIndex: 0,
      explainCorrect: "int() ממיר טקסט למספר שלם ."
    }
  },  
  
  {
    id: "float_sum_two_numbers",
      group: "basics",
  topic: "מספרים עשרוניים",
  title: "חיבור עשרוניים עם float",
  subtitle: "float()",
  explain: "float() פקודה שהופכת טקסט (string) של מספר עשרוני למספר עשרוני אמיתי, כדי שאפשר יהיה לעשות איתו חישובים.",
  task: "הקוד מבקש מהמשתמש שני מספרים עשרוניים. השתמשו ב-float() כדי להפוך אותם למספרים, ואז חברו והדפיסו את הסכום.",
  hint: "a = float(input(...)) ואז b = float(input(...)) ואז print(a + b)",
  starter: `a = input("הכנס מספר עשרוני ראשון: ")
b = input("הכנס מספר עשרוני שני: ")

# הפכו ל-float, חברו והדפיסו:
`,
  solution: `a = float(input("הכנס מספר עשרוני ראשון: "))
b = float(input("הכנס מספר עשרוני שני: "))

print(a + b)`,
  expectedOutput: null,
  fallback: {
    type: "quiz",
    question: "באיזו פקודה משתמשים כדי להפוך טקסט כמו \"3.14\" למספר עשרוני שאפשר לחשב איתו?",
    options: ["int()", "float()", "str()", "print()"],
    correctIndex: 1,
    explainCorrect: "float() ממיר טקסט למספר עשרוני כדי שאפשר יהיה לעשות איתו חיבור/חיסור/כפל."
  }
  },
  {
  id: "list_1",
  group: "basics",
  topic: "רשימות",
  title: "הדפסה פריט מרשימה לפי אינדקס",
  subtitle: "list index",
  explain: "רשימה היא דרך לשמור על כמה פריטי מידע במקום אחד - לכל פריט ברשימה יש מספר לפי המקום שלו ברשימה וככה אפשר לשלוף אותו - וזה נקרא אינדקס",
  task: "לפניכם רשימה של פירות הדפיסו את הפרי השני ברשימה ",
  hint: "האינדקס של הפריט הראשון הוא 0 , נסו לפנות לרשימה ולהשתמש בסוגריים מרובעות []",
  starter: `fruits = ["תפוח", "בננה", "ענבים"]
  # הדפיסו את כל הרשימה
  # הדפיסו את הפרי האמצעי`,
  solution: `fruits = ["תפוח", "בננה", "ענבים"]
print(fruits)
print(fruits[1])`,
  expectedOutput: "בננה",
  fallback: {
    type: "quiz",
    question: "באיזו פקודה משתמשים כדי להפוך טקסט כמו \"3.14\" למספר עשרוני שאפשר לחשב איתו?",
    options: ["int()", "float()", "str()", "print()"],
    correctIndex: 1,
    explainCorrect: "float() ממיר טקסט למספר עשרוני כדי שאפשר יהיה לעשות איתו חיבור/חיסור/כפל."
  }
  },
{
  id: "list_2",
  group: "basics",
  topic: "רשימות",
  title: "שינוי פריט ברשימה",
  subtitle: "list update",
  explain: "רשימה מאפשרת לנו לשמור כמה פריטים ביחד, וגם לשנות פריט מסוים לפי המקום שלו ברשימה בעזרת אינדקס.",
  task: "לפניכם רשימה של צבעים. הדפיסו את כל הרשימה, אחר כך החליפו את הצבע השני ל-\"סגול\", ואז הדפיסו שוב את הרשימה המעודכנת.",
  hint: "האינדקס של הפריט הראשון הוא 0, ולכן האינדקס של הפריט השני הוא 1. אפשר לשנות ערך ברשימה בעזרת שם הרשימה, סוגריים מרובעות, וסימן שווה.",
  starter: `colors = ["אדום", "כחול", "ירוק", "צהוב"]
# הדפיסו את כל הרשימה
# שנו את הצבע השני ל-\"סגול\"
# הדפיסו שוב את הרשימה`,
  solution: `colors = ["אדום", "כחול", "ירוק", "צהוב"]
print(colors)
colors[1] = "סגול"
print(colors)`,
  expectedOutput: `['אדום', 'כחול', 'ירוק', 'צהוב']
['אדום', 'סגול', 'ירוק', 'צהוב']`,
  fallback: {
    type: "quiz",
    question: "אם רוצים לשנות את הפריט השני ברשימה, באיזה אינדקס נשתמש?",
    options: ["0", "1", "2", "3"],
    correctIndex: 1,
    explainCorrect: "האינדקס של הפריט הראשון הוא 0, ולכן הפריט השני נמצא באינדקס 1."
  }
},{
  id: "list_3",
  group: "basics",
  topic: "רשימות",
  title: "הדפסת הפריט הראשון והאחרון ברשימה",
  subtitle: "first and last item with index",
  explain: "אפשר לגשת לפריטים ברשימה לפי המיקום שלהם. הפריט הראשון נמצא באינדקס 0, והפריט האחרון נמצא תמיד באינדקס ‎-1.",
  task: "לפניכם רשימה של חיות. הדפיסו את הפריט הראשון ברשימה ולאחר מכן הדפיסו את הפריט האחרון בעזרת אינדקס ‎-1.",
  hint: "הפריט הראשון נמצא באינדקס 0. בפייתון אפשר להשתמש ב־-1 כדי להגיע לפריט האחרון ברשימה.",
  starter: `animals = ["חתול", "כלב", "אריה", "פיל"]
# הדפיסו את הפריט הראשון
# הדפיסו את הפריט האחרון בעזרת ‎-1`,
  solution: `animals = ["חתול", "כלב", "אריה", "פיל"]
print(animals[0])
print(animals[-1])`,
  expectedOutput: `חתול
פיל`,
  fallback: {
    type: "quiz",
    question: "באיזה אינדקס משתמשים בפייתון כדי להגיע לפריט האחרון ברשימה?",
    options: ["0", "1", "-1", "len()"],
    correctIndex: 2,
    explainCorrect: "בפייתון האינדקס ‎-1 תמיד מחזיר את הפריט האחרון ברשימה."
  }
},
  {
  id: "list_4",
  group: "basics",
  topic: "רשימות",
  title: "הוספת פריט חדש לרשימה",
  subtitle: "append item",
  explain: "אפשר להוסיף פריטים חדשים לרשימה בעזרת הפקודה append(). הפקודה מוסיפה פריט חדש לסוף הרשימה.",
  task: "לפניכם רשימה של מאכלים. הוסיפו את המאכל \"פיצה\" לסוף הרשימה ולאחר מכן הדפיסו את הרשימה.",
  hint: "כדי להוסיף פריט לרשימה משתמשים בשם הרשימה ואז append() עם הפריט בתוך סוגריים.",
  starter: `foods = ["פסטה", "אורז", "סלט"]
# הוסיפו \"פיצה\" לרשימה
# הדפיסו את הרשימה`,
  solution: `foods = ["פסטה", "אורז", "סלט"]
foods.append("פיצה")
print(foods)`,
  expectedOutput: `['פסטה', 'אורז', 'סלט', 'פיצה']`,
  fallback: {
    type: "quiz",
    question: "באיזו פקודה משתמשים כדי להוסיף פריט לסוף רשימה?",
    options: ["add()", "append()", "push()", "insert()"],
    correctIndex: 1,
    explainCorrect: "append() מוסיפה פריט חדש לסוף הרשימה."
  }
},{
  id: "random_1",
  group: "basics",
  topic: "random",
  title: "הגרלת מספר רנדומלי",
  subtitle: "randint",
  explain: "ספריית random מאפשרת לנו להגריל מספרים באקראי. הפקודה randint מחזירה מספר רנדומלי בין שני מספרים שאנחנו בוחרים, כולל שני הקצוות.",
  task: "ייבאו את ספריית random, הגרילו מספר רנדומלי בין 1 ל-10, ושמרו אותו במשתנה בשם number. לאחר מכן הדפיסו את המספר.",
  hint: "קודם צריך לכתוב import random. אחר כך אפשר להשתמש ב-random.randint(1, 10).",
  starter: `# ייבאו את ספריית random
# הגרילו מספר בין 1 ל-10
# הדפיסו את המספר`,
  solution: `import random

number = random.randint(1, 10)
print(number)`,
  expectedOutput: null,
  fallback: {
    type: "quiz",
    question: "מה עושה הפקודה random.randint(1, 10)?",
    options: [
      "מדפיסה את כל המספרים מ-1 עד 10",
      "מגרילה מספר רנדומלי בין 1 ל-10",
      "יוצרת רשימה של מספרים",
      "ממירה טקסט למספר"
    ],
    correctIndex: 1,
    explainCorrect: "random.randint(1, 10) מגרילה מספר אקראי בין 1 ל-10, כולל 1 וגם 10."
  }
},{
  id: "random_2",
  group: "basics",
  topic: "random",
  title: "בחירת פריט רנדומלי מרשימה",
  subtitle: "random.choice",
  explain: "הפקודה random.choice מאפשרת לבחור פריט אחד באקראי מתוך רשימה. היא שימושית למשל במשחקים, הגרלות, או בחירת תשובה רנדומלית.",
  task: "ייבאו את ספריית random. לאחר מכן בחרו פרי רנדומלי מתוך הרשימה ושמרו אותו במשתנה בשם fruit. לבסוף הדפיסו את הפרי שנבחר.",
  hint: "קודם צריך לכתוב import random. אחר כך משתמשים ב-random.choice(list_name).",
  starter: `fruits = ["תפוח", "בננה", "ענבים", "תות"]
# ייבאו את ספריית random
# בחרו פרי רנדומלי מתוך הרשימה
# הדפיסו את הפרי`,
  solution: `import random

fruits = ["תפוח", "בננה", "ענבים", "תות"]
fruit = random.choice(fruits)
print(fruit)`,
  expectedOutput: null,
  fallback: {
    type: "quiz",
    question: "מה עושה הפקודה random.choice(fruits)?",
    options: [
      "מוסיפה פרי לרשימה",
      "מוחקת פרי מהרשימה",
      "בוחרת פרי אקראי מתוך הרשימה",
      "מסדרת את הרשימה לפי סדר"
    ],
    correctIndex: 2,
    explainCorrect: "random.choice בוחרת פריט אחד באקראי מתוך הרשימה."
  }
},
  {
  id: "random_3",
  group: "basics",
  topic: "random",
  title: "ערבוב סדר הרשימה",
  subtitle: "random.shuffle",
  explain: "הפקודה random.shuffle מערבבת את הסדר של הפריטים בתוך רשימה באופן אקראי. היא משנה את הרשימה עצמה.",
  task: "ייבאו את ספריית random. לאחר מכן ערבבו את סדר הרשימה והדפיסו את הרשימה החדשה.",
  hint: "קודם צריך לכתוב import random. לאחר מכן משתמשים ב-random.shuffle(list_name).",
  starter: `numbers = [1, 2, 3, 4, 5]
# ייבאו את ספריית random
# ערבבו את הרשימה
# הדפיסו את הרשימה`,
  solution: `import random

numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)`,
  expectedOutput: null,
  fallback: {
    type: "quiz",
    question: "מה עושה הפקודה random.shuffle(numbers)?",
    options: [
      "מוסיפה מספר לרשימה",
      "מוחקת מספר מהרשימה",
      "מערבבת את סדר הפריטים ברשימה",
      "מדפיסה את הרשימה"
    ],
    correctIndex: 2,
    explainCorrect: "random.shuffle מערבבת את סדר הפריטים בתוך הרשימה באופן אקראי."
  }
},{
  id: "dict_1",
  group: "basics",
  topic: "מילון",
  title: "שליפת ערך ממילון לפי מפתח",
  subtitle: "dictionary key",
  explain: "מילון בפייתון שומר מידע בזוגות של מפתח וערך. כדי להגיע לערך מסוים משתמשים בשם המפתח.",
  task: "לפניכם מילון עם פרטים על תלמיד. הדפיסו את השם של התלמיד מתוך המילון.",
  hint: "כדי לגשת לערך במילון משתמשים בשם המילון ובתוך סוגריים מרובעות כותבים את המפתח במרכאות.",
  starter: `student = {
    "name": "דני",
    "age": 10,
    "city": "חיפה"
}
# הדפיסו את השם של התלמיד`,
  solution: `student = {
    "name": "דני",
    "age": 10,
    "city": "חיפה"
}

print(student["name"])`,
  expectedOutput: `דני`,
  fallback: {
    type: "quiz",
    question: "איך ניגשים לשם של התלמיד מתוך המילון student?",
    options: [
      "student[0]",
      "student.name",
      "student['name']",
      "student('name')"
    ],
    correctIndex: 2,
    explainCorrect: "במילון ניגשים לערך לפי המפתח, ולכן כותבים student['name']."
  }
},{
  id: "dict_2",
  group: "basics",
  topic: "מילון",
  title: "הוספת זוג חדש למילון",
  subtitle: "add new key and value",
  explain: "אפשר להוסיף למילון מידע חדש על ידי כתיבת מפתח חדש וערך חדש. כך המילון שומר עוד פרט מידע.",
  task: "לפניכם מילון עם פרטים על תלמיד. הוסיפו למילון את המפתח \"favorite_color\" עם הערך \"כחול\", ולאחר מכן הדפיסו את הערך החדש שהוספתם.",
  hint: "כדי להוסיף זוג חדש למילון כותבים את שם המילון, ואז בתוך סוגריים מרובעות את המפתח החדש, ושמים לו ערך בעזרת סימן שווה.",
  starter: `student = {
    "name": "דני",
    "age": 10
}
# הוסיפו את המפתח "favorite_color" עם הערך "כחול"
# הדפיסו את הערך החדש`,
  solution: `student = {
    "name": "דני",
    "age": 10
}

student["favorite_color"] = "כחול"
print(student["favorite_color"])`,
  expectedOutput: `כחול`,
  fallback: {
    type: "quiz",
    question: "איך מוסיפים מפתח חדש בשם \"city\" עם הערך \"תל אביב\" למילון student?",
    options: [
      "student.add('city') = 'תל אביב'",
      "student['city'] = 'תל אביב'",
      "student('city') = 'תל אביב'",
      "student.city = 'תל אביב'"
    ],
    correctIndex: 1,
    explainCorrect: "במילון מוסיפים זוג חדש בעזרת כתיבת המפתח בתוך סוגריים מרובעות והשמה של ערך חדש."
  }
},{
  id: "dict_3",
  group: "basics",
  topic: "מילון",
  title: "שינוי ערך במילון",
  subtitle: "update value",
  explain: "אפשר לשנות ערך קיים במילון על ידי פנייה למפתח שכבר נמצא בו, ואז הצבה של ערך חדש.",
  task: "לפניכם מילון עם פרטים על תלמיד. שנו את הגיל של התלמיד ל-11, ולאחר מכן הדפיסו את הגיל החדש.",
  hint: "כדי לשנות ערך במילון משתמשים במפתח שכבר קיים, ושמים לו ערך חדש עם סימן שווה.",
  starter: `student = {
    "name": "דני",
    "age": 10
}
# שנו את הגיל ל-11
# הדפיסו את הגיל החדש`,
  solution: `student = {
    "name": "דני",
    "age": 10
}

student["age"] = 11
print(student["age"])`,
  expectedOutput: `11`,
  fallback: {
    type: "quiz",
    question: "איך משנים את הגיל במילון student ל-12?",
    options: [
      "student['age'] = 12",
      "student.age = 12",
      "student( age ) = 12",
      "student.add('age', 12)"
    ],
    correctIndex: 0,
    explainCorrect: "כדי לשנות ערך במילון ניגשים למפתח המתאים ומציבים לו ערך חדש."
  }
},
  /* ======================
     PROJECTS – YEAR 1
     (שנה א׳)
     ====================== */

  {
    id: "simple_calculator_sum",
    group: "projects_y1",
    topic: "מחשבון",
    title: "מחשבון חיבור",
    subtitle: "float()",
    explain: "מחשבון קולט שני מספרים ומחשב תוצאה. כדי לעבוד עם מספרים עשרוניים משתמשים ב־float().",
    task: "קלטו שני מספרים מהמשתמש, חברו ביניהם והדפיסו את התוצאה.",
    hint: "השתמשו ב־float(input()) לשני המספרים ואז חברו ביניהם",
    starter: `
a = float(input("הכנס מספר ראשון: "))
b = float(input("הכנס מספר שני: "))
`,
    solution: `
a = float(input("הכנס מספר ראשון: "))
b = float(input("הכנס מספר שני: "))
print(a + b)
`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "באיזו פקודה משתמשים כדי לקלוט מספר עשרוני מהמשתמש?",
      options: ["int(input())", "float(input())", "str(input())", "print()"],
      correctIndex: 1,
      explainCorrect: "float(input()) מאפשר לקלוט מספר עשרוני ולחשב איתו."
    }
  },

  {
    id: "lists_basics_fruits",
    group: "projects_y1",
    topic: "רשימות",
    title: "רשימות - הבסיס",
    subtitle: "list + index",
    explain: "רשימה (list) היא אוסף של פריטים בתוך סוגריים מרובעים []. לכל פריט יש מיקום (אינדקס): הראשון הוא 0, השני 1 וכן הלאה.",
    task: "צרו רשימה של 3 פירות, הדפיסו את כל הרשימה, ואז הדפיסו רק את הפריט הראשון ואת הפריט האחרון.",
    hint: "fruits[0] זה הראשון, ו־fruits[-1] זה האחרון.",
    starter: `
fruits = ["תפוח", "בננה", "ענבים"]

# הדפיסו את כל הרשימה
# הדפיסו את הפריט הראשון
# הדפיסו את הפריט האחרון
`,
    solution: `
fruits = ["תפוח", "בננה", "ענבים"]

print(fruits)
print("ראשון:", fruits[0])
print("אחרון:", fruits[-1])
`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה מחזיר fruits[0] אם fruits = ['תפוח','בננה','ענבים'] ?",
      options: ["'תפוח'", "'בננה'", "'ענבים'", "כל הרשימה"],
      correctIndex: 0,
      explainCorrect: "האינדקס 0 הוא הפריט הראשון ברשימה."
    }
  },

  {
    id: "tip_calculator",
    group: "projects_y1",
    topic: "מחשבון",
    title: "מחשבון טיפ",
    subtitle: "float() + חישוב אחוזים",
    explain: "אפשר לחשב אחוזים בעזרת כפל וחילוק: אם החשבון יצא 100 ש״ח ורוצים טיפ של 10%, מחשבים 100 × 10 ÷ 100 – והתוצאה היא 10.",
    task: "קלטו מהמשתמש את סכום החשבון ואת אחוז הטיפ, חשבו כמה טיפ יצא, ואז הדפיסו את הסכום הכולל לתשלום.",
    hint: "tip = bill * percent / 100 ואז total = bill + tip",
    starter: `
bill = float(input("כמה יצא החשבון? "))
percent = float(input("כמה אחוז טיפ? "))
`,
    solution: `
bill = float(input("כמה יצא החשבון? "))
percent = float(input("כמה אחוז טיפ? "))

tip = bill * percent / 100
total = bill + tip

print("הטיפ הוא:", int(tip))
print("סה\"כ לתשלום:", int(total))
`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "איך מחשבים 15% מתוך סכום bill?",
      options: ["bill + 15", "bill * 15", "bill * 15 / 100", "bill / 15"],
      correctIndex: 2,
      explainCorrect: "אחוז מחשבים על ידי כפל וחילוק ב־100: bill * 15 / 100."
    }
  },

  /* ======================
     PROJECTS – YEAR 2
     (שנה ב׳)
     ====================== */

  {
    id: "typing_speed_test",
    group: "projects_y2",
    topic: "זמן ושעה",
    title: "בדיקת מהירות הקלדה",
    subtitle: "time.time()",
    explain: "מודדים זמן בעזרת time.time() (שומרים זמן התחלה, מחכים שהמשתמש יקליד, ואז שומרים זמן סיום ומחשבים כמה זמן עבר).",
    task: "הציגו למשתמש משפט קצר להקלדה, מדדו כמה זמן לקח לו להקליד אותו, והדפיסו: לקח לך X שניות .",
    hint: "התחל למדוד זמן לפני הקלט של המשתמש, עצור את המדידה אחרי הקלט, וחישב את ההפרש בין הזמנים כדי לדעת כמה זמן לקח לו.",
    starter: `
import time

sentence = "אני אוהב פייתון"
print("הקלד/י את המשפט:")
print(sentence)

# כאן מודדים זמן ומקבלים קלט
`,
    solution: `
import time

sentence = "אני אוהב פייתון"
print("הקלד/י את המשפט:")
print(sentence)

start = time.time()
typed = input("הקלדה: ")
end = time.time()

timePass = end - start
print("לקח לך:", timePass, "שניות")
`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "איזה ביטוי מחשב כמה זמן עבר בין end ל-start?",
      options: ["start - end", "end + start", "end - start", "start * end"],
      correctIndex: 2,
      explainCorrect: "כדי לחשב זמן שעבר מחסרים: end - start."
    }
  },

  {
    id: "rock_paper_scissors",
    group: "projects_y2",
    topic: "Random + תנאים",
    title: "אבן–נייר–מספריים",
    subtitle: "random.choice() + if",
    explain: "נשתמש ב־random כדי שהמחשב יבחר אבן/נייר/מספריים בצורה אקראית, ואז נשווה מול הבחירה של המשתמש בעזרת תנאים (if) כדי לקבוע ניצחון, הפסד או תיקו.",
    task: "קלטו מהמשתמש אבן/נייר/מספריים, תנו למחשב לבחור אקראית, הדפיסו את שתי הבחירות ואז הדפיסו את התוצאה: ניצחת / הפסדת / תיקו.",
    hint: "computer = random.choice([...]) ואז if user == computer -> תיקו, אחרת בדקו את שלושת מצבי הניצחון של המשתמש.",
    starter: `
import random

user = input("בחר/י אבן/נייר/מספריים: ")
computer = random.choice(["אבן", "נייר", "מספריים"])

print("אתה בחרת:", user)
print("המחשב בחר:", computer)

# כאן קובעים מי ניצח
`,
    solution: `
import random

user = input("בחר/י אבן/נייר/מספריים: ")
computer = random.choice(["אבן", "נייר", "מספריים"])

print("אתה בחרת:", user)
print("המחשב בחר:", computer)

if user == computer:
    print("תיקו")
elif (user == "אבן" and computer == "מספריים") or (user == "נייר" and computer == "אבן") or (user == "מספריים" and computer == "נייר"):
    print("ניצחת")
else:
    print("הפסדת")
`,
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה הפקודה שמגרילה בחירה אקראית מתוך רשימה?",
      options: ["random.choice()", "random.randint()", "input()", "print()"],
      correctIndex: 0,
      explainCorrect: "random.choice() בוחרת פריט אקראי מתוך רשימה."
    }
  },

  /* ======================
     PROJECTS – YEAR 3 (SQL)
     היה: grade3
     עכשיו: projects_y3
     ====================== */

  {
    id: "sql_quiz_1",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 1: מזה sql?",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה זה SQL?",
      options: ["שפת ציור למשחקים", "שפה לעבודה עם בסיס נתונים", "שפת עיצוב אתרים", "מערכת הפעלה"],
      correctIndex: 1,
      explainCorrect: "SQL היא שפה שבעזרתה עובדים עם מידע בבסיס נתונים."
    }
  },

  {
    id: "sql_quiz_2",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 2: מזה בסיס נתונים?",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה התיאור הכי נכון לבסיס נתונים?",
      options: ["משחק מחשב", "סרטון", "ציור", "מקום לשמור מידע בצורה מסודרת"],
      correctIndex: 3,
      explainCorrect: "בסיס נתונים שומר מידע בצורה מסודרת."
    }
  },

  {
    id: "sql_quiz_3",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 3: מהי commit",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה עושה פקודת commit",
      options: ["מוחקת את בסיס הנתונים", "מוסיפה פריט חדש לבסיס הנתונים", "שומרת את השינויים שנעשו בבסיס הנתונים", "מביאה את התוצאות שבסיס הנתונים החזיר לנו"],
      correctIndex: 2,
      explainCorrect: "commit היא כמו סייב—שומרת את השינויים שעשינו בבסיס הנתונים."
    }
  },

  {
    id: "sql_quiz_4",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 4: מזה cursor",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "למה משתמשים ב־cursor?",
      options: ["כדי לצייר", "כדי להדפיס", "כדי להפעיל משחק", "כדי להריץ פקודות SQL"],
      correctIndex: 3,
      explainCorrect: "cursor מאפשר להריץ פקודות על בסיס הנתונים (execute)."
    }
  },

  {
    id: "sql_quiz_5",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 5: מזה SELECT",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה עושה SELECT?",
      options: ["מוחק מידע", "מוסיף מידע", "שולף מידע", "סוגר את המחשב"],
      correctIndex: 2,
      explainCorrect: "SELECT משמש לשליפת מידע מהטבלה."
    }
  },

  {
    id: "sql_order_1",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 6: בונים שאילתה",
    subtitle: "SELECT בסיסי",
    explain: "נבנה שאילתת SELECT פשוטה.",
    task: "להציג את כל העמודות בטבלה (books).",
    hint: "קודם SELECT ואז FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "SELECT *" }, { correct: "FROM books;" }],
      bank: ["SELECT *", "FROM books;", "WHERE id = 1;", "INSERT INTO books"],
      explainCorrect: "קודם SELECT ואז FROM."
    }
  },

  {
    id: "sql_order_2",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 7: בונים שאילתה",
    subtitle: "SELECT עם עמודות",
    explain: "",
    task: "להציג רק את העמודות (title) ו-(author) מכל הרשומות בטבלה (books).",
    hint: "קודם SELECT ואז FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "SELECT title, author" }, { correct: "FROM books;" }],
      bank: ["SELECT title, author", "SELECT *", "FROM books;", "WHERE id = 1;"],
      explainCorrect: "קודם SELECT ואז FROM."
    }
  },

  {
    id: "sql_order_3",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 8: WHERE",
    subtitle: "סינון מידע",
    explain: "WHERE מסנן מידע לפי תנאי.",
    task: "להציג את הרשומה שה-(id) שלה שווה ל-(1) מתוך הטבלה (books).",
    hint: "WHERE מגיע אחרי FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", " ", ""],
      blanks: [{ correct: "SELECT *" }, { correct: "FROM books" }, { correct: "WHERE id = 1;" }],
      bank: ["SELECT *", "FROM books", "WHERE id = 1;", "VALUES (...);", "CREATE TABLE"],
      explainCorrect: "WHERE מגיע אחרי FROM."
    }
  },

  {
    id: "sql_order_4",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 9: INSERT",
    subtitle: "הוספת מידע",
    explain: "",
    task: "להוסיף רשומה חדשה לטבלה (books) עם ערכים חדשים.",
    hint: "קודם INSERT INTO ואז VALUES.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "INSERT INTO books" }, { correct: "VALUES (...);" }],
      bank: ["INSERT INTO books", "VALUES (...);", "SELECT *", "FROM books;"],
      explainCorrect: "קודם INSERT INTO ואז VALUES."
    }
  },

  {
    id: "sql_order_5",
    group: "projects_y3",
    topic: "SQL",
    title: "שאלה 10: CREATE TABLE",
    subtitle: "יצירת טבלה",
    explain: "",
    task: "ליצור טבלה חדשה בשם (books) עם .",
    hint: "קודם CREATE TABLE ואז שם הטבלה.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "CREATE TABLE" }, { correct: "books;" }],
      bank: ["CREATE TABLE", "books;", "INSERT INTO books", "VALUES (...);"],
      explainCorrect: "קודם CREATE TABLE ואז שם הטבלה."
    }
  },

  /* ======================
     MINI PROJECTS (חדש)
     ====================== */

  {
    id: "mini_project_1",
    group: "mini_projects",
    topic: "מיני־פרויקט",
    title: "מיני־פרויקט 1: מחשבון גיל",
    subtitle: "פרויקט עצמאי בליווי",
    explain: "בפרויקט הזה תבנו מיני־תוכנית שמדברת עם המשתמש, שואלת שאלות ומדפיסה תשובה. המטרה היא לתרגל input, משתנים ו-print.",
    task: "כתבו תוכנית ששואלת גיל (מספר), ואז מדפיסה: בעוד שנה אתה תהיה בן X. (X = גיל + 1)",
    hint: "age = int(input(...)) ואז print(age + 1)",
    starter: ``,
    solution: `age = int(input("מה הגיל שלך? "))
print("בעוד שנה אתה תהיה בן", age + 1)`,
    expectedOutput: null,
    mode: "fallbackOnly",
    fallback: {
      type: "steps",
      steps: [
        {
          title: "שלב 1: קלט",
          type: "quiz",
          question: "איזו פקודה קוראת קלט מהמשתמש?",
          options: ["print()", "input()", "int()", "for"],
          correctIndex: 1,
          explainCorrect: "input() קורא קלט מהמשתמש ומחזיר טקסט."
        },
        {
          title: "שלב 2: המרה למספר",
          type: "quiz",
          question: "למה צריך int(input()) כשקולטים גיל?",
          options: ["כדי להפוך מספר לטקסט", "כדי להפוך טקסט למספר שאפשר לחשב איתו", "כדי לעשות לולאה", "כדי להדפיס מהר יותר"],
          correctIndex: 1,
          explainCorrect: "input() מחזיר טקסט, ו-int() הופך אותו למספר."
        }
      ]
    }
  },
  {
  id: "mini_secret_code",
  group: "mini_projects",
  topic: "מיני־פרויקט",
  title: "קוד סודי 🔐",
  subtitle: "משחק חשיבה עם רמזים",
  explain: "המחשב מסתיר קוד בן 3 ספרות. בכל ניחוש תקבלו רמז: ✅ ספרה נכונה במקום נכון, 🔁 ספרה קיימת אבל במקום אחר, ❌ לא קיימת.",
  task: "בנה משחק שמגריל קוד בן 3 ספרות ונותן רמזים לכל ספרה לפי בול/קיים/לא קיים עד שמנצחים.",
  hint: "השתמש בלולאה: עבור כל i בדוק אם guess[i] == code[i], אחרת אם guess[i] נמצא ב-code.",
  mode: "fallbackOnly",
  starter: "",
  solution: `import random

code = [random.randint(0,9), random.randint(0,9), random.randint(0,9)]
print("🔐 יש קוד סודי בן 3 ספרות! נסו לפצח אותו.")
print("תקבלו רמזים: ✅ בול, 🔁 קיים, ❌ לא קיים")

while True:
    guess = input("ניחוש (3 ספרות): ")

    if len(guess) != 3 or not guess.isdigit():
        print("תכתוב בדיוק 3 ספרות!")
        continue

    g = [int(guess[0]), int(guess[1]), int(guess[2])]

    if g == code:
        print("🎉 פיצחת את הקוד!")
        break

    hints = []
    for i in range(3):
        if g[i] == code[i]:
            hints.append("✅")
        elif g[i] in code:
            hints.append("🔁")
        else:
            hints.append("❌")

    print("רמזים:", " ".join(hints))`,
  expectedOutput: null,
  fallback: {
    type: "steps",
    steps: [
      {
        title: "שלב 1: יצירת קוד",
        type: "quiz",
        question: "מה עושה random.randint(0,9)?",
        options: ["מדפיס מספר", "מגריל מספר שלם בין 0 ל־9", "עוצר את הקוד", "יוצר רשימה"],
        correctIndex: 1,
        explainCorrect: "randint מחזיר מספר שלם אקראי בטווח."
      },
      {
        title: "שלב 2: בדיקת קלט",
        type: "quiz",
        question: "איך בודקים שהמשתמש כתב בדיוק 3 תווים?",
        options: ["len(guess) == 3", "guess == 3", "guess.length == 3", "size(guess) == 3"],
        correctIndex: 0,
        explainCorrect: "len(guess) מחזיר כמה תווים יש בטקסט."
      },
      {
        title: "שלב 3: תנאי ניצחון",
        type: "order",
        prompt: "סדר את השורות: אם הניחוש שווה לקוד → מנצחים ויוצאים",
        pieces: [
          "break",
          "print(\"🎉 פיצחת את הקוד!\")",
          "if g == code:"
        ],
        correct: [
          "if g == code:",
          "print(\"🎉 פיצחת את הקוד!\")",
          "break"
        ],
        explainCorrect: "בודקים תנאי, מדפיסים, ואז break יוצא מהלולאה."
      },
      {
        title: "שלב 4: רמזים לכל ספרה",
        type: "quiz",
        question: "מה ההבדל בין == לבין in ?",
        options: [
          "אין הבדל",
          "== בודק שוויון, in בודק אם משהו נמצא בתוך רשימה/טקסט",
          "in בודק שוויון",
          "== עובד רק על מספרים"
        ],
        correctIndex: 1,
        explainCorrect: "== זה שווה, in זה נמצא בתוך."
      }
    ]
  }
}

];

