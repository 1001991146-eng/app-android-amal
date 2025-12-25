// נתוני ההרחבות לפרויקט בגרות באנדרואיד
// Data for Android bagrut project extensions

export interface Extension {
  id: string;
  name: string;
  nameEn: string;
  category: "required" | "advanced" | "combined";
  points: number;
  description: string;
  theory: string;
  codeExample: string;
  principles: string[];
  tips: string[];
}

export const extensions: Extension[] = [
  // Required Extensions (Section 6)
  {
    id: "alarm-manager",
    name: "AlarmManager",
    nameEn: "AlarmManager",
    category: "required",
    points: 1,
    description: "מאפשר תזמון משימות שיופעלו בזמן מסוים בעתיד, גם כשהאפליקציה לא פעילה.",
    theory: `AlarmManager הוא שירות מערכת באנדרואיד המאפשר לתזמן פעולות שיתבצעו בזמן עתידי מוגדר. 
    
העיקרון המרכזי: הפרדה בין תזמון הפעולה לבין ביצועה בפועל. ה-AlarmManager רק "מעיר" את המערכת בזמן הנכון, ואז מפעיל קוד דרך BroadcastReceiver או Service.

סוגי התראות:
• RTC_WAKEUP - זמן אמיתי, מעיר את המכשיר
• RTC - זמן אמיתי, לא מעיר את המכשיר  
• ELAPSED_REALTIME_WAKEUP - זמן יחסי מאתחול, מעיר
• ELAPSED_REALTIME - זמן יחסי, לא מעיר

שיקולים חשובים:
• צריכת סוללה - התראות תכופות מנקזות סוללה
• דיוק - מאנדרואיד 19+ ההתראות לא מדויקות כברירת מחדל
• התמודדות עם כיבוי/הפעלה מחדש של המכשיר`,
    codeExample: `// הגדרת AlarmManager
AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

// יצירת Intent שיופעל כשההתראה מגיעה
Intent intent = new Intent(this, AlarmReceiver.class);
intent.putExtra("message", "הגיע הזמן!");

// יצירת PendingIntent
PendingIntent pendingIntent = PendingIntent.getBroadcast(
    this, 
    0, 
    intent, 
    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
);

// חישוב הזמן - לדוגמה: עוד שעה מעכשיו
long triggerTime = System.currentTimeMillis() + (60 * 60 * 1000);

// הגדרת ההתראה
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    // מאנדרואיד 6.0+ - התראה מדויקת שגם מעירה ממצב Doze
    alarmManager.setExactAndAllowWhileIdle(
        AlarmManager.RTC_WAKEUP, 
        triggerTime, 
        pendingIntent
    );
} else {
    alarmManager.setExact(
        AlarmManager.RTC_WAKEUP, 
        triggerTime, 
        pendingIntent
    );
}

// ביטול התראה
alarmManager.cancel(pendingIntent);`,
    principles: [
      "הפרדת אחריות - AlarmManager רק מתזמן, הלוגיקה ב-Receiver",
      "שימוש ב-PendingIntent להעברת הקשר",
      "התאמה לגרסאות אנדרואיד שונות",
      "ניהול משאבים - ביטול התראות שלא נחוצות"
    ],
    tips: [
      "זכור להוסיף את ה-BroadcastReceiver ל-AndroidManifest",
      "השתמש ב-setExact רק כשדיוק קריטי",
      "טפל באירוע BOOT_COMPLETED לשחזור התראות"
    ]
  },
  {
    id: "notification",
    name: "Notification",
    nameEn: "Notification",
    category: "required",
    points: 1,
    description: "הצגת הודעות למשתמש בשורת ההתראות של המכשיר.",
    theory: `Notifications הן הדרך העיקרית לתקשר עם המשתמש כשהאפליקציה לא בפוקוס.

העיקרון המרכזי: מתן מידע חשוב למשתמש בצורה לא פולשנית, עם אפשרות לפעולה.

רכיבים מרכזיים:
• NotificationChannel (מאנדרואיד 8.0+) - קטגוריה להתראות
• NotificationCompat.Builder - בניית ההתראה
• NotificationManager - שליחת ההתראה

סוגי התראות:
• רגילות - מידע כללי
• עדיפות גבוהה - מוצגות כ-heads-up
• שקטות - ללא צליל/רטט`,
    codeExample: `// יצירת ערוץ התראות (חובה מאנדרואיד 8.0)
private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        CharSequence name = "ערוץ ההתראות שלי";
        String description = "תיאור הערוץ";
        int importance = NotificationManager.IMPORTANCE_DEFAULT;
        
        NotificationChannel channel = new NotificationChannel(
            "my_channel_id", 
            name, 
            importance
        );
        channel.setDescription(description);
        
        NotificationManager notificationManager = 
            getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    }
}

// בניית ושליחת התראה
private void showNotification(String title, String message) {
    // Intent שייפתח כשלוחצים על ההתראה
    Intent intent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(
        this, 0, intent, 
        PendingIntent.FLAG_IMMUTABLE
    );
    
    // בניית ההתראה
    NotificationCompat.Builder builder = 
        new NotificationCompat.Builder(this, "my_channel_id")
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true); // נעלמת אחרי לחיצה
    
    // שליחת ההתראה
    NotificationManagerCompat notificationManager = 
        NotificationManagerCompat.from(this);
    notificationManager.notify(1, builder.build());
}`,
    principles: [
      "שימוש ב-NotificationChannel לארגון התראות",
      "Builder Pattern לבניית אובייקטים מורכבים",
      "תאימות לאחור עם NotificationCompat",
      "חווית משתמש - התראות רלוונטיות בלבד"
    ],
    tips: [
      "צור ערוצים שונים לסוגי התראות שונים",
      "בדוק הרשאת POST_NOTIFICATIONS באנדרואיד 13+",
      "השתמש ב-setAutoCancel(true) להתראות חד פעמיות"
    ]
  },
  {
    id: "job-scheduler",
    name: "JobScheduler",
    nameEn: "JobScheduler",
    category: "required",
    points: 1,
    description: "תזמון משימות רקע חכם שמתחשב במצב המכשיר.",
    theory: `JobScheduler הוא API חכם לתזמון משימות רקע שמתחשב בתנאי המכשיר.

העיקרון המרכזי: במקום להריץ משימה בזמן מדויק, מגדירים תנאים - והמערכת מחליטה מתי הכי יעיל להריץ.

יתרונות:
• חיסכון בסוללה - מאגד משימות יחד
• גמישות - מגדירים תנאים ולא זמנים
• אמינות - שורד כיבוי/הפעלה מחדש

תנאים אפשריים:
• חיבור לרשת (כל רשת / WiFi בלבד)
• מצב טעינה
• מכשיר לא בשימוש (Idle)
• אחסון זמין`,
    codeExample: `// הגדרת JobService
public class MyJobService extends JobService {
    @Override
    public boolean onStartJob(JobParameters params) {
        // הקוד שירוץ ברקע
        new Thread(() -> {
            // ביצוע המשימה
            performBackgroundWork();
            
            // סיום המשימה
            jobFinished(params, false); // false = לא לתזמן מחדש
        }).start();
        
        return true; // true = העבודה עדיין רצה ברקע
    }
    
    @Override
    public boolean onStopJob(JobParameters params) {
        // נקרא אם המערכת מפסיקה את העבודה
        return true; // true = לתזמן מחדש
    }
}

// תזמון Job
private void scheduleJob() {
    ComponentName componentName = 
        new ComponentName(this, MyJobService.class);
    
    JobInfo jobInfo = new JobInfo.Builder(JOB_ID, componentName)
        .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY) // דרוש רשת
        .setRequiresCharging(false) // לא חייב טעינה
        .setPersisted(true) // שורד ריסטארט (דורש הרשאה)
        .setPeriodic(15 * 60 * 1000) // מינימום 15 דקות
        .build();
    
    JobScheduler scheduler = 
        (JobScheduler) getSystemService(JOB_SCHEDULER_SERVICE);
    scheduler.schedule(jobInfo);
}`,
    principles: [
      "הפרדה בין הגדרת התנאים לביצוע המשימה",
      "ניהול משאבים חכם ע\"י המערכת",
      "עבודה אסינכרונית ב-JobService",
      "טיפול נכון בהפסקת עבודה"
    ],
    tips: [
      "הוסף את ה-Service ל-Manifest עם permission",
      "זמן מינימלי למשימה מחזורית: 15 דקות",
      "השתמש ב-WorkManager לתאימות טובה יותר"
    ]
  },
  {
    id: "internet-data",
    name: "הורדת נתונים מהאינטרנט",
    nameEn: "Internet Data Download",
    category: "required",
    points: 1,
    description: "קריאה ל-API חיצוני והורדת נתונים מהרשת.",
    theory: `תקשורת עם שרתים היא עיקרון מרכזי באפליקציות מודרניות.

עקרונות מרכזיים:
• עבודה אסינכרונית - תקשורת רשת אסורה ב-Main Thread
• טיפול בשגיאות - הרשת לא תמיד זמינה
• פענוח נתונים - בד\"כ JSON

שלבים בתקשורת:
1. בניית הבקשה (URL, Headers, Body)
2. שליחה אסינכרונית
3. קבלת תשובה
4. פענוח הנתונים
5. עדכון ה-UI (חזרה ל-Main Thread)`,
    codeExample: `// AsyncTask להורדת נתונים (דרך קלאסית)
private class DownloadTask extends AsyncTask<String, Void, String> {
    @Override
    protected String doInBackground(String... urls) {
        try {
            URL url = new URL(urls[0]);
            HttpURLConnection connection = 
                (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream())
                );
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                return response.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    protected void onPostExecute(String result) {
        // חזרה ל-Main Thread - אפשר לעדכן UI
        if (result != null) {
            parseAndDisplayData(result);
        } else {
            showError("שגיאה בהורדת הנתונים");
        }
    }
}

// פענוח JSON
private void parseAndDisplayData(String jsonString) {
    try {
        JSONObject json = new JSONObject(jsonString);
        String name = json.getString("name");
        int age = json.getInt("age");
        
        JSONArray items = json.getJSONArray("items");
        for (int i = 0; i < items.length(); i++) {
            JSONObject item = items.getJSONObject(i);
            // עיבוד כל פריט
        }
    } catch (JSONException e) {
        e.printStackTrace();
    }
}`,
    principles: [
      "עבודה אסינכרונית - לא לחסום את ה-UI",
      "טיפול בשגיאות רשת",
      "הפרדה בין הורדה, פענוח והצגה",
      "חזרה ל-Main Thread לעדכון UI"
    ],
    tips: [
      "הוסף הרשאת INTERNET ל-Manifest",
      "בדוק חיבור רשת לפני הורדה",
      "שקול להשתמש בספריות כמו Retrofit"
    ]
  },
  {
    id: "service",
    name: "Service",
    nameEn: "Service",
    category: "required",
    points: 1,
    description: "רכיב שרץ ברקע ללא ממשק משתמש.",
    theory: `Service הוא רכיב אנדרואיד שמבצע פעולות ברקע ללא UI.

סוגים עיקריים:
• Started Service - מופעל ע\"י startService(), רץ עד שעוצר את עצמו
• Bound Service - מחובר ל-Activity, קיים כל עוד יש חיבורים
• Foreground Service - מוצג כהתראה, עדיפות גבוהה

עקרונות:
• Service רץ ב-Main Thread כברירת מחדל!
• יש ליצור Thread נפרד לעבודה כבדה
• Foreground Service נדרש לפעולות ארוכות`,
    codeExample: `// Service בסיסי
public class MyService extends Service {
    
    @Override
    public void onCreate() {
        super.onCreate();
        // אתחול חד פעמי
    }
    
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // נקרא בכל קריאה ל-startService
        
        // עבודה ב-Thread נפרד
        new Thread(() -> {
            // ביצוע העבודה
            performTask();
            
            // עצירה עצמית בסיום
            stopSelf();
        }).start();
        
        // START_STICKY = המערכת תנסה להפעיל מחדש
        return START_STICKY;
    }
    
    @Override
    public IBinder onBind(Intent intent) {
        return null; // Started Service לא תומך ב-binding
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        // ניקוי משאבים
    }
}

// הפעלת Foreground Service
private void startForegroundService() {
    Intent intent = new Intent(this, MyService.class);
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        startForegroundService(intent);
    } else {
        startService(intent);
    }
}

// בתוך ה-Service - מעבר ל-Foreground
@Override
public int onStartCommand(Intent intent, int flags, int startId) {
    Notification notification = createNotification();
    startForeground(NOTIFICATION_ID, notification);
    
    // המשך העבודה...
    return START_STICKY;
}`,
    principles: [
      "Service רץ ב-Main Thread - צור Thread לעבודה כבדה",
      "Foreground Service לפעולות ארוכות",
      "ניהול מחזור חיים נכון",
      "עצירה עצמית בסיום העבודה"
    ],
    tips: [
      "הוסף את ה-Service ל-AndroidManifest",
      "דרוש הרשאת FOREGROUND_SERVICE באנדרואיד 9+",
      "השתמש ב-IntentService לעבודות פשוטות"
    ]
  },
  {
    id: "activity-for-result",
    name: "ActivityForResult",
    nameEn: "ActivityForResult",
    category: "required",
    points: 1,
    description: "הפעלת Activity וקבלת תוצאה בחזרה.",
    theory: `מנגנון להעברת נתונים בין Activities בצורה מובנית.

העיקרון: Activity א' מפעיל Activity ב', וכש-ב' מסתיים הוא מחזיר תוצאה ל-א'.

שימושים נפוצים:
• בחירת תמונה מהגלריה
• צילום תמונה
• בחירת איש קשר
• כל מסך בחירה שמחזיר תוצאה

הדרך החדשה (מומלצת):
Activity Result API - יותר גמיש ובטוח`,
    codeExample: `// === הדרך הקלאסית ===

// הפעלת Activity עם ציפייה לתוצאה
private static final int REQUEST_CODE = 1;

private void openSelectionActivity() {
    Intent intent = new Intent(this, SelectionActivity.class);
    intent.putExtra("category", "fruits");
    startActivityForResult(intent, REQUEST_CODE);
}

// קבלת התוצאה
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    
    if (requestCode == REQUEST_CODE) {
        if (resultCode == RESULT_OK && data != null) {
            String selectedItem = data.getStringExtra("selected_item");
            handleSelection(selectedItem);
        } else if (resultCode == RESULT_CANCELED) {
            // המשתמש ביטל
        }
    }
}

// ב-SelectionActivity - החזרת תוצאה
private void returnResult(String selection) {
    Intent resultIntent = new Intent();
    resultIntent.putExtra("selected_item", selection);
    setResult(RESULT_OK, resultIntent);
    finish();
}

// === הדרך החדשה - Activity Result API ===

// הגדרת ה-Launcher
private ActivityResultLauncher<Intent> selectionLauncher = 
    registerForActivityResult(
        new ActivityResultContracts.StartActivityForResult(),
        result -> {
            if (result.getResultCode() == RESULT_OK) {
                Intent data = result.getData();
                if (data != null) {
                    String selected = data.getStringExtra("selected_item");
                    handleSelection(selected);
                }
            }
        }
    );

// הפעלה
private void openSelection() {
    Intent intent = new Intent(this, SelectionActivity.class);
    selectionLauncher.launch(intent);
}`,
    principles: [
      "Request Code לזיהוי מקור הבקשה",
      "Result Code לציון הצלחה/ביטול",
      "Intent להעברת הנתונים",
      "Activity Result API - הדרך המודרנית"
    ],
    tips: [
      "השתמש בקבועים ל-Request Codes",
      "תמיד בדוק resultCode לפני גישה לנתונים",
      "Activity Result API עדיף לקוד חדש"
    ]
  },
  {
    id: "content-provider",
    name: "ContentProvider",
    nameEn: "ContentProvider",
    category: "required",
    points: 1,
    description: "שיתוף נתונים בין אפליקציות בצורה מאובטחת.",
    theory: `ContentProvider הוא ממשק סטנדרטי לגישה לנתונים בין אפליקציות.

עקרונות מרכזיים:
• URI - כתובת ייחודית לכל סוג נתונים
• CRUD - פעולות Create, Read, Update, Delete
• הרשאות - שליטה מי יכול לגשת

שימושים:
• גישה לאנשי קשר, תמונות, הודעות
• שיתוף נתונים בין אפליקציות שלך
• חשיפת נתונים לאפליקציות אחרות`,
    codeExample: `// קריאה מ-ContentProvider (לדוגמה: אנשי קשר)
private void readContacts() {
    // בדיקת הרשאה
    if (ContextCompat.checkSelfPermission(this, 
            Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(this, 
            new String[]{Manifest.permission.READ_CONTACTS}, 1);
        return;
    }
    
    // שאילתה
    Cursor cursor = getContentResolver().query(
        ContactsContract.Contacts.CONTENT_URI,  // URI
        new String[] {                           // עמודות
            ContactsContract.Contacts._ID,
            ContactsContract.Contacts.DISPLAY_NAME
        },
        null,                                    // סינון (WHERE)
        null,                                    // ערכי הסינון
        ContactsContract.Contacts.DISPLAY_NAME  // מיון
    );
    
    if (cursor != null) {
        while (cursor.moveToNext()) {
            String id = cursor.getString(
                cursor.getColumnIndex(ContactsContract.Contacts._ID));
            String name = cursor.getString(
                cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
            
            // שימוש בנתונים
            Log.d("Contact", name);
        }
        cursor.close(); // חשוב לסגור!
    }
}

// יצירת ContentProvider משלך
public class MyContentProvider extends ContentProvider {
    private static final String AUTHORITY = "com.example.app.provider";
    private static final Uri CONTENT_URI = 
        Uri.parse("content://" + AUTHORITY + "/items");
    
    @Override
    public boolean onCreate() {
        // אתחול (DB וכו')
        return true;
    }
    
    @Override
    public Cursor query(Uri uri, String[] projection, 
            String selection, String[] selectionArgs, String sortOrder) {
        // החזרת נתונים
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        return db.query("items", projection, selection, 
            selectionArgs, null, null, sortOrder);
    }
    
    @Override
    public Uri insert(Uri uri, ContentValues values) {
        // הוספת רשומה
        long id = db.insert("items", null, values);
        return ContentUris.withAppendedId(CONTENT_URI, id);
    }
    
    // ... update, delete, getType
}`,
    principles: [
      "URI כמזהה ייחודי לנתונים",
      "הפרדה בין נותן השירות לצרכן",
      "ניהול הרשאות מובנה",
      "ממשק סטנדרטי (CRUD)"
    ],
    tips: [
      "תמיד סגור Cursor אחרי שימוש",
      "בדוק הרשאות לפני גישה",
      "השתמש ב-CursorLoader לטעינה אסינכרונית"
    ]
  },
  {
    id: "animation",
    name: "יצירת אנימציה",
    nameEn: "Custom Animation",
    category: "required",
    points: 1,
    description: "יצירת אנימציה עצמאית באמצעות ציור על Canvas - לא שימוש במחלקות אנימציה מוכנות.",
    theory: `יצירת אנימציה עצמאית מבוססת על ציור חוזר על Canvas ולא על שימוש במחלקות מוכנות כמו ObjectAnimator.

העיקרון המרכזי:
• לולאת אנימציה (Game Loop) - ציור מחדש בתדירות קבועה
• שינוי מיקום/מצב בכל פריים
• שימוש ב-Canvas לציור גרפיקה
• שימוש ב-SurfaceView או View מותאם אישית

שלבי האנימציה:
1. חישוב המצב הבא (Update)
2. ציור המצב הנוכחי (Draw)
3. חזרה לשלב 1

סוגי מימוש:
• View עם invalidate() - פשוט, מתאים לאנימציות קלות
• SurfaceView עם Thread - מתאים למשחקים ואנימציות כבדות
• Handler עם postDelayed - שליטה בתזמון

הבדל מ-ObjectAnimator:
• ObjectAnimator משנה מאפיינים של View קיים
• אנימציה עצמאית מציירת הכל מאפס על Canvas`,
    codeExample: `// ========================================
// יצירת View מותאם אישית לאנימציה
// ========================================
public class AnimatedBallView extends View {
    
    // מיקום הכדור
    private float ballX = 100;
    private float ballY = 100;
    
    // מהירות הכדור
    private float speedX = 5;
    private float speedY = 7;
    
    // רדיוס הכדור
    private float radius = 50;
    
    // צבע לציור
    private Paint paint;
    
    // האם האנימציה רצה
    private boolean isRunning = true;
    
    // Handler לניהול הלולאה
    private Handler handler = new Handler();
    
    // ========== Constructor ==========
    public AnimatedBallView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }
    
    private void init() {
        // אתחול Paint לציור
        paint = new Paint();
        paint.setColor(Color.RED);
        paint.setAntiAlias(true); // קצוות חלקים
    }
    
    // ========== לולאת האנימציה ==========
    private Runnable animationLoop = new Runnable() {
        @Override
        public void run() {
            if (isRunning) {
                // שלב 1: עדכון המצב
                update();
                
                // שלב 2: ציור מחדש
                invalidate(); // גורם לקריאה ל-onDraw
                
                // שלב 3: תזמון הפריים הבא (60 FPS = 16ms)
                handler.postDelayed(this, 16);
            }
        }
    };
    
    // ========== עדכון המצב ==========
    private void update() {
        // הזזת הכדור לפי המהירות
        ballX += speedX;
        ballY += speedY;
        
        // בדיקת התנגשות בקירות ושינוי כיוון
        if (ballX - radius < 0 || ballX + radius > getWidth()) {
            speedX = -speedX; // היפוך כיוון אופקי
            ballX = Math.max(radius, Math.min(ballX, getWidth() - radius));
        }
        
        if (ballY - radius < 0 || ballY + radius > getHeight()) {
            speedY = -speedY; // היפוך כיוון אנכי
            ballY = Math.max(radius, Math.min(ballY, getHeight() - radius));
        }
    }
    
    // ========== ציור על ה-Canvas ==========
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        
        // ציור הרקע
        canvas.drawColor(Color.WHITE);
        
        // ציור הכדור
        canvas.drawCircle(ballX, ballY, radius, paint);
        
        // אפשר להוסיף עוד ציורים
        // canvas.drawRect(left, top, right, bottom, paint);
        // canvas.drawLine(startX, startY, endX, endY, paint);
        // canvas.drawText("טקסט", x, y, paint);
    }
    
    // ========== התחלת האנימציה ==========
    public void startAnimation() {
        isRunning = true;
        handler.post(animationLoop);
    }
    
    // ========== עצירת האנימציה ==========
    public void stopAnimation() {
        isRunning = false;
        handler.removeCallbacks(animationLoop);
    }
    
    // ========== חשוב! ניקוי משאבים ==========
    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        stopAnimation(); // עצירת האנימציה כשה-View מוסר
    }
}

// ========================================
// שימוש ב-Activity
// ========================================
public class AnimationActivity extends AppCompatActivity {
    
    private AnimatedBallView animatedView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // יצירת ה-View
        animatedView = new AnimatedBallView(this, null);
        setContentView(animatedView);
        
        // התחלת האנימציה
        animatedView.startAnimation();
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        animatedView.stopAnimation(); // חיסכון בסוללה
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        animatedView.startAnimation();
    }
}

// ========================================
// דוגמה מתקדמת: SurfaceView לביצועים טובים יותר
// ========================================
public class GameSurfaceView extends SurfaceView implements Runnable {
    
    private Thread gameThread;
    private boolean isPlaying;
    private SurfaceHolder surfaceHolder;
    
    // משתני האנימציה
    private float objectX = 0;
    private float objectY = 0;
    private Paint paint = new Paint();
    
    public GameSurfaceView(Context context) {
        super(context);
        surfaceHolder = getHolder();
        paint.setColor(Color.BLUE);
    }
    
    @Override
    public void run() {
        while (isPlaying) {
            // עדכון
            update();
            
            // ציור
            draw();
            
            // המתנה ל-60 FPS
            try {
                Thread.sleep(16);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    private void update() {
        objectX += 3;
        if (objectX > getWidth()) {
            objectX = 0;
        }
    }
    
    private void draw() {
        if (surfaceHolder.getSurface().isValid()) {
            Canvas canvas = surfaceHolder.lockCanvas();
            
            // ציור
            canvas.drawColor(Color.WHITE);
            canvas.drawCircle(objectX, objectY + 200, 30, paint);
            
            surfaceHolder.unlockCanvasAndPost(canvas);
        }
    }
    
    public void resume() {
        isPlaying = true;
        gameThread = new Thread(this);
        gameThread.start();
    }
    
    public void pause() {
        isPlaying = false;
        try {
            gameThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}`,
    principles: [
      "Game Loop - לולאת update-draw חוזרת",
      "Canvas - ציור גרפיקה באופן עצמאי",
      "invalidate() - מבקש ציור מחדש של ה-View",
      "Handler/Thread - ניהול תזמון האנימציה"
    ],
    tips: [
      "השתמש ב-SurfaceView לאנימציות כבדות או משחקים",
      "תמיד עצור את האנימציה ב-onPause לחיסכון בסוללה",
      "60 FPS = עדכון כל 16 מילישניות",
      "זכור לנקות משאבים ב-onDetachedFromWindow"
    ]
  },
  {
    id: "sqlite-storage",
    name: "אחסון וטיפול בנתונים",
    nameEn: "Data Storage",
    category: "required",
    points: 1,
    description: "שמירת נתונים מקומית באמצעות SQLite וקבצים.",
    theory: `אחסון נתונים הוא קריטי לכל אפליקציה - מאפשר שמירת מידע גם אחרי סגירת האפליקציה.

אפשרויות אחסון באנדרואיד:
• SharedPreferences - מתאים להגדרות פשוטות (key-value)
• SQLite Database - מסד נתונים יחסי לנתונים מובנים
• קבצים פנימיים/חיצוניים - לנתונים לא מובנים
• Room - ספרייה מודרנית שעוטפת SQLite

SQLite - עקרונות:
• מסד נתונים יחסי מלא
• שפת SQL לשאילתות
• דורש הגדרת סכמה (טבלאות, עמודות)
• SQLiteOpenHelper לניהול גרסאות`,
    codeExample: `// SQLiteOpenHelper - ניהול מסד הנתונים
public class DBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "my_database.db";
    private static final int DB_VERSION = 1;
    
    // הגדרת טבלה
    private static final String TABLE_USERS = "users";
    private static final String COL_ID = "_id";
    private static final String COL_NAME = "name";
    private static final String COL_EMAIL = "email";
    
    public DBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }
    
    @Override
    public void onCreate(SQLiteDatabase db) {
        // יצירת טבלאות
        String createTable = "CREATE TABLE " + TABLE_USERS + " (" +
            COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
            COL_NAME + " TEXT NOT NULL, " +
            COL_EMAIL + " TEXT UNIQUE)";
        db.execSQL(createTable);
    }
    
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // טיפול בשדרוג גרסה
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
        onCreate(db);
    }
    
    // הוספת משתמש
    public long insertUser(String name, String email) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_NAME, name);
        values.put(COL_EMAIL, email);
        return db.insert(TABLE_USERS, null, values);
    }
    
    // קריאת כל המשתמשים
    public ArrayList<User> getAllUsers() {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        
        Cursor cursor = db.query(TABLE_USERS, null, null, null, null, null, COL_NAME);
        
        while (cursor.moveToNext()) {
            int id = cursor.getInt(cursor.getColumnIndex(COL_ID));
            String name = cursor.getString(cursor.getColumnIndex(COL_NAME));
            String email = cursor.getString(cursor.getColumnIndex(COL_EMAIL));
            users.add(new User(id, name, email));
        }
        cursor.close();
        return users;
    }
    
    // עדכון משתמש
    public int updateUser(int id, String name, String email) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_NAME, name);
        values.put(COL_EMAIL, email);
        return db.update(TABLE_USERS, values, COL_ID + "=?", 
            new String[]{String.valueOf(id)});
    }
    
    // מחיקת משתמש
    public int deleteUser(int id) {
        SQLiteDatabase db = getWritableDatabase();
        return db.delete(TABLE_USERS, COL_ID + "=?", 
            new String[]{String.valueOf(id)});
    }
}`,
    principles: [
      "SQLiteOpenHelper לניהול מסד הנתונים",
      "ContentValues להכנסה ועדכון",
      "Cursor לקריאת תוצאות",
      "ניהול גרסאות ב-onUpgrade"
    ],
    tips: [
      "תמיד סגור Cursor אחרי שימוש",
      "השתמש בקבועים לשמות טבלאות ועמודות",
      "שקול להשתמש ב-Room לפרויקטים חדשים"
    ]
  },
  
  // Advanced Topics (Section 9)
  {
    id: "sensors",
    name: "חיישנים",
    nameEn: "Sensors",
    category: "advanced",
    points: 1,
    description: "שימוש בחיישני המכשיר כמו תאוצה, אור, קירבה ועוד.",
    theory: `אנדרואיד מספק גישה למגוון חיישנים פיזיים.

סוגי חיישנים:
• תנועה: תאוצה, ג'ירוסקופ, כוח משיכה
• סביבה: אור, לחץ, טמפרטורה, לחות
• מיקום: מגנטומטר, קירבה

עקרונות:
• SensorManager לגישה לחיישנים
• SensorEventListener לקבלת נתונים
• ניהול חיים - רישום וביטול רישום`,
    codeExample: `public class SensorActivity extends AppCompatActivity 
        implements SensorEventListener {
    
    private SensorManager sensorManager;
    private Sensor accelerometer;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // קבלת SensorManager
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        
        // בדיקה אם החיישן קיים
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if (accelerometer == null) {
            Toast.makeText(this, "אין חיישן תאוצה", Toast.LENGTH_SHORT).show();
        }
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        // רישום לקבלת נתונים
        if (accelerometer != null) {
            sensorManager.registerListener(this, accelerometer, 
                SensorManager.SENSOR_DELAY_NORMAL);
        }
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        // ביטול רישום לחיסכון בסוללה
        sensorManager.unregisterListener(this);
    }
    
    @Override
    public void onSensorChanged(SensorEvent event) {
        // קבלת נתונים מהחיישן
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];
            
            // זיהוי ניעור
            float acceleration = Math.sqrt(x*x + y*y + z*z);
            if (acceleration > 15) {
                onShakeDetected();
            }
        }
    }
    
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // שינוי בדיוק החיישן
    }
}`,
    principles: [
      "בדיקת זמינות חיישן לפני שימוש",
      "רישום וביטול רישום לפי מחזור חיים",
      "בחירת תדירות דגימה מתאימה",
      "עיבוד נתונים גולמיים"
    ],
    tips: [
      "בטל רישום ב-onPause לחיסכון בסוללה",
      "השתמש ב-SENSOR_DELAY מתאים לצרכים",
      "לא כל המכשירים תומכים בכל החיישנים"
    ]
  },
  {
    id: "surface-view",
    name: "SurfaceView",
    nameEn: "SurfaceView",
    category: "advanced",
    points: 1,
    description: "ציור גרפי מהיר ומתקדם לאנימציות ומשחקים.",
    theory: `SurfaceView מספק משטח ציור נפרד לביצועים גבוהים.

יתרונות על View רגיל:
• ציור ב-Thread נפרד
• ביצועים גבוהים לאנימציות
• מתאים למשחקים

עקרונות:
• SurfaceHolder לגישה ל-Canvas
• Game Loop לעדכון ציור רציף
• Double Buffering מובנה`,
    codeExample: `public class GameView extends SurfaceView implements Runnable {
    private Thread gameThread;
    private boolean isRunning;
    private SurfaceHolder holder;
    
    // אובייקטים לציור
    private Paint paint;
    private int playerX = 100;
    private int playerY = 100;
    
    public GameView(Context context) {
        super(context);
        holder = getHolder();
        paint = new Paint();
        paint.setColor(Color.BLUE);
    }
    
    public void resume() {
        isRunning = true;
        gameThread = new Thread(this);
        gameThread.start();
    }
    
    public void pause() {
        isRunning = false;
        try {
            gameThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void run() {
        // Game Loop
        while (isRunning) {
            if (!holder.getSurface().isValid()) {
                continue;
            }
            
            update();  // עדכון לוגיקה
            draw();    // ציור
            
            // שליטה ב-FPS
            try {
                Thread.sleep(16); // ~60 FPS
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    private void update() {
        // עדכון מיקום, פיזיקה, התנגשויות
        playerX += 2;
        if (playerX > getWidth()) {
            playerX = 0;
        }
    }
    
    private void draw() {
        Canvas canvas = holder.lockCanvas();
        if (canvas != null) {
            // ניקוי המסך
            canvas.drawColor(Color.WHITE);
            
            // ציור אובייקטים
            canvas.drawCircle(playerX, playerY, 50, paint);
            
            holder.unlockCanvasAndPost(canvas);
        }
    }
    
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_DOWN) {
            playerX = (int) event.getX();
            playerY = (int) event.getY();
        }
        return true;
    }
}`,
    principles: [
      "Game Loop - לולאת עדכון וציור",
      "ציור ב-Thread נפרד",
      "lockCanvas / unlockCanvasAndPost",
      "שליטה ב-FPS"
    ],
    tips: [
      "עצור את ה-Thread ב-onPause",
      "בדוק שה-Surface תקין לפני ציור",
      "הפרד לוגיקה מציור"
    ]
  },
  {
    id: "custom-view",
    name: "ירושה ממחלקת View",
    nameEn: "Custom View",
    category: "advanced",
    points: 1,
    description: "יצירת רכיב UI מותאם אישית.",
    theory: `יצירת View מותאם מאפשרת שליטה מלאה בציור והתנהגות.

מתי ליצור Custom View:
• פונקציונליות שלא קיימת ב-Views הסטנדרטיים
• ציור גרפי מיוחד
• התנהגות ייחודית

מתודות עיקריות:
• onMeasure - קביעת גודל
• onDraw - ציור
• onTouchEvent - טיפול במגע`,
    codeExample: `public class CircularProgressView extends View {
    private Paint backgroundPaint;
    private Paint progressPaint;
    private RectF bounds;
    private float progress = 0; // 0-100
    
    public CircularProgressView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }
    
    private void init() {
        backgroundPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        backgroundPaint.setStyle(Paint.Style.STROKE);
        backgroundPaint.setStrokeWidth(20);
        backgroundPaint.setColor(Color.LTGRAY);
        
        progressPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        progressPaint.setStyle(Paint.Style.STROKE);
        progressPaint.setStrokeWidth(20);
        progressPaint.setStrokeCap(Paint.Cap.ROUND);
        progressPaint.setColor(Color.BLUE);
        
        bounds = new RectF();
    }
    
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int size = Math.min(
            MeasureSpec.getSize(widthMeasureSpec),
            MeasureSpec.getSize(heightMeasureSpec)
        );
        setMeasuredDimension(size, size);
    }
    
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        float padding = 20;
        bounds.set(padding, padding, w - padding, h - padding);
    }
    
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        
        // רקע
        canvas.drawArc(bounds, 0, 360, false, backgroundPaint);
        
        // התקדמות
        float sweepAngle = (progress / 100) * 360;
        canvas.drawArc(bounds, -90, sweepAngle, false, progressPaint);
    }
    
    public void setProgress(float progress) {
        this.progress = Math.max(0, Math.min(100, progress));
        invalidate(); // בקשה לציור מחדש
    }
    
    // אנימציית התקדמות
    public void animateProgress(float toProgress) {
        ValueAnimator animator = ValueAnimator.ofFloat(progress, toProgress);
        animator.setDuration(1000);
        animator.addUpdateListener(animation -> {
            progress = (float) animation.getAnimatedValue();
            invalidate();
        });
        animator.start();
    }
}

// שימוש ב-XML
// <com.example.app.CircularProgressView
//     android:id="@+id/progressView"
//     android:layout_width="200dp"
//     android:layout_height="200dp" />`,
    principles: [
      "onMeasure לקביעת גודל",
      "onDraw לציור",
      "invalidate() לבקשת ציור מחדש",
      "שימוש ב-Paint לסגנון"
    ],
    tips: [
      "אתחל Paint ב-init, לא ב-onDraw",
      "השתמש ב-ANTI_ALIAS_FLAG לקווים חלקים",
      "תמוך ב-AttributeSet לתכונות מ-XML"
    ]
  },
  {
    id: "google-maps",
    name: "GoogleMaps",
    nameEn: "GoogleMaps",
    category: "advanced",
    points: 1,
    description: "שילוב מפות גוגל באפליקציה.",
    theory: `Google Maps SDK מאפשר הצגת מפות אינטראקטיביות.

יכולות:
• הצגת מפה עם סמנים
• מעקב GPS
• חישוב מסלולים
• Geocoding - המרה בין כתובת לקואורדינטות

דרישות:
• מפתח API מ-Google Cloud Console
• הגדרות ב-Manifest ו-build.gradle`,
    codeExample: `public class MapsActivity extends FragmentActivity 
        implements OnMapReadyCallback {
    
    private GoogleMap mMap;
    private FusedLocationProviderClient fusedLocationClient;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        
        // אתחול מפה
        SupportMapFragment mapFragment = (SupportMapFragment) 
            getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        
        // לקבלת מיקום נוכחי
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
    }
    
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        
        // הוספת סמן
        LatLng telAviv = new LatLng(32.0853, 34.7818);
        mMap.addMarker(new MarkerOptions()
            .position(telAviv)
            .title("תל אביב")
            .snippet("עיר ללא הפסקה"));
        
        // הזזת המצלמה
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(telAviv, 12));
        
        // הגדרות מפה
        mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
        mMap.getUiSettings().setZoomControlsEnabled(true);
        
        // האזנה ללחיצות
        mMap.setOnMarkerClickListener(marker -> {
            Toast.makeText(this, marker.getTitle(), Toast.LENGTH_SHORT).show();
            return false;
        });
        
        // הצגת מיקום נוכחי (דורש הרשאה)
        enableMyLocation();
    }
    
    private void enableMyLocation() {
        if (ContextCompat.checkSelfPermission(this, 
                Manifest.permission.ACCESS_FINE_LOCATION) 
                == PackageManager.PERMISSION_GRANTED) {
            mMap.setMyLocationEnabled(true);
            
            // קבלת מיקום אחרון
            fusedLocationClient.getLastLocation()
                .addOnSuccessListener(location -> {
                    if (location != null) {
                        LatLng myLocation = new LatLng(
                            location.getLatitude(), 
                            location.getLongitude()
                        );
                        mMap.animateCamera(
                            CameraUpdateFactory.newLatLngZoom(myLocation, 15)
                        );
                    }
                });
        } else {
            ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }
    }
    
    // Geocoding - המרת כתובת לקואורדינטות
    private void searchAddress(String address) {
        Geocoder geocoder = new Geocoder(this);
        try {
            List<Address> results = geocoder.getFromLocationName(address, 1);
            if (!results.isEmpty()) {
                Address location = results.get(0);
                LatLng latLng = new LatLng(
                    location.getLatitude(), 
                    location.getLongitude()
                );
                mMap.addMarker(new MarkerOptions().position(latLng).title(address));
                mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 15));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
    principles: [
      "OnMapReadyCallback - המפה נטענת אסינכרונית",
      "LatLng לייצוג מיקום",
      "Marker לסימון נקודות",
      "Geocoder להמרת כתובות"
    ],
    tips: [
      "הגדר API key ב-local.properties (לא ב-git)",
      "בדוק הרשאות מיקום",
      "השתמש ב-FusedLocationProviderClient למיקום"
    ]
  },
  {
    id: "fragment",
    name: "Fragment",
    nameEn: "Fragment",
    category: "advanced",
    points: 1,
    description: "חלק מודולרי של ממשק משתמש שניתן לשימוש חוזר.",
    theory: `Fragment הוא חלק עצמאי של UI עם מחזור חיים משלו.

יתרונות:
• מודולריות - קוד ניתן לשימוש חוזר
• התאמה למסכים שונים (טאבלט/טלפון)
• ניהול ניווט מתקדם

עקרונות:
• Fragment חי בתוך Activity
• FragmentManager לניהול
• תקשורת דרך ה-Activity המארח`,
    codeExample: `// הגדרת Fragment
public class ItemDetailFragment extends Fragment {
    private static final String ARG_ITEM_ID = "item_id";
    private int itemId;
    
    // Factory method - דרך נכונה ליצירה
    public static ItemDetailFragment newInstance(int itemId) {
        ItemDetailFragment fragment = new ItemDetailFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_ITEM_ID, itemId);
        fragment.setArguments(args);
        return fragment;
    }
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            itemId = getArguments().getInt(ARG_ITEM_ID);
        }
    }
    
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_item_detail, container, false);
        
        TextView titleView = view.findViewById(R.id.title);
        titleView.setText("פריט מספר " + itemId);
        
        return view;
    }
    
    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        // אתחול נוסף אחרי שה-View מוכן
    }
}

// שימוש ב-Fragment מתוך Activity
public class MainActivity extends AppCompatActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        if (savedInstanceState == null) {
            // הוספת Fragment ראשון
            getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.fragment_container, ItemDetailFragment.newInstance(1))
                .commit();
        }
    }
    
    // החלפת Fragment
    public void showItemDetail(int itemId) {
        getSupportFragmentManager()
            .beginTransaction()
            .replace(R.id.fragment_container, ItemDetailFragment.newInstance(itemId))
            .addToBackStack(null) // אפשרות לחזור
            .commit();
    }
}

// תקשורת בין Fragment ל-Activity
public interface OnItemSelectedListener {
    void onItemSelected(int itemId);
}

// ב-Fragment
private OnItemSelectedListener listener;

@Override
public void onAttach(Context context) {
    super.onAttach(context);
    if (context instanceof OnItemSelectedListener) {
        listener = (OnItemSelectedListener) context;
    }
}

private void selectItem(int id) {
    if (listener != null) {
        listener.onItemSelected(id);
    }
}`,
    principles: [
      "newInstance() עם Arguments להעברת נתונים",
      "FragmentManager לניהול Fragments",
      "addToBackStack לניווט אחורה",
      "Interface לתקשורת עם Activity"
    ],
    tips: [
      "השתמש ב-newInstance במקום constructor",
      "בדוק getActivity() != null לפני שימוש",
      "שמור מצב ב-onSaveInstanceState"
    ]
  },
  {
    id: "threads",
    name: "Threads",
    nameEn: "Threads",
    category: "advanced",
    points: 1,
    description: "ריבוי תהליכים לביצוע משימות ברקע.",
    theory: `Threads מאפשרים ביצוע קוד במקביל.

כללים באנדרואיד:
• Main Thread (UI Thread) - רק לעדכוני UI
• Background Thread - לעבודה כבדה
• אסור לעדכן UI מ-Background Thread

דרכים לעבודה עם Threads:
• Thread + Handler
• AsyncTask (deprecated)
• Executor
• Coroutines (Kotlin)`,
    codeExample: `// Thread בסיסי
new Thread(() -> {
    // עבודה ברקע
    String result = doHeavyWork();
    
    // חזרה ל-UI Thread
    runOnUiThread(() -> {
        textView.setText(result);
    });
}).start();

// Handler לתקשורת בין Threads
Handler mainHandler = new Handler(Looper.getMainLooper());

new Thread(() -> {
    // עבודה ברקע
    final String result = processData();
    
    // שליחת הודעה ל-Main Thread
    mainHandler.post(() -> {
        updateUI(result);
    });
}).start();

// ExecutorService - ניהול מתקדם
ExecutorService executor = Executors.newFixedThreadPool(4);

executor.execute(() -> {
    // משימה 1
});

executor.execute(() -> {
    // משימה 2
});

// סגירה מסודרת
executor.shutdown();

// HandlerThread - Thread עם Looper
HandlerThread handlerThread = new HandlerThread("BackgroundThread");
handlerThread.start();

Handler backgroundHandler = new Handler(handlerThread.getLooper());
backgroundHandler.post(() -> {
    // עבודה ב-Thread הייעודי
});

// סנכרון בין Threads
private final Object lock = new Object();
private int sharedCounter = 0;

public void incrementSafely() {
    synchronized (lock) {
        sharedCounter++;
    }
}

// או עם AtomicInteger
private AtomicInteger atomicCounter = new AtomicInteger(0);

public void increment() {
    atomicCounter.incrementAndGet();
}`,
    principles: [
      "Main Thread רק ל-UI",
      "runOnUiThread/Handler לחזרה ל-UI",
      "סנכרון לגישה למשאבים משותפים",
      "ניהול מחזור חיים של Threads"
    ],
    tips: [
      "השתמש ב-ExecutorService לניהול Threads",
      "זכור לעצור Threads כשה-Activity נסגר",
      "הימנע מ-synchronized מיותר (ביצועים)"
    ]
  },
  
  // Combined Topics (Section 10) - 2 נושאים = נושא מתקדם אחד
  {
    id: "broadcast-receiver",
    name: "BroadcastReceiver",
    nameEn: "BroadcastReceiver",
    category: "combined",
    points: 0.5,
    description: "קבלת הודעות מערכת ואפליקציות אחרות.",
    theory: `BroadcastReceiver מאפשר לקבל הודעות ממערכת ההפעלה ומאפליקציות אחרות.

סוגי Broadcasts:
• מערכת: BOOT_COMPLETED, BATTERY_LOW, CONNECTIVITY_CHANGE
• אפליקציה: הודעות מותאמות אישית

דרכי רישום:
• Manifest - פעיל תמיד (מוגבל מאנדרואיד 8)
• קוד (registerReceiver) - רק כשהאפליקציה פעילה`,
    codeExample: `// הגדרת BroadcastReceiver
public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        
        if (Intent.ACTION_BATTERY_LOW.equals(action)) {
            Toast.makeText(context, "סוללה חלשה!", Toast.LENGTH_SHORT).show();
        } else if ("com.example.MY_ACTION".equals(action)) {
            String data = intent.getStringExtra("data");
            // טיפול בנתונים
        }
    }
}

// רישום דינמי (בקוד)
private MyReceiver receiver;

@Override
protected void onResume() {
    super.onResume();
    receiver = new MyReceiver();
    IntentFilter filter = new IntentFilter();
    filter.addAction(Intent.ACTION_BATTERY_LOW);
    filter.addAction("com.example.MY_ACTION");
    registerReceiver(receiver, filter);
}

@Override
protected void onPause() {
    super.onPause();
    unregisterReceiver(receiver);
}

// שליחת Broadcast
Intent intent = new Intent("com.example.MY_ACTION");
intent.putExtra("data", "מידע כלשהו");
sendBroadcast(intent);

// LocalBroadcastManager - לתוך האפליקציה בלבד (יותר יעיל)
LocalBroadcastManager.getInstance(this).sendBroadcast(intent);

// רישום ב-Manifest (מוגבל מאנדרואיד 8)
// <receiver android:name=".MyReceiver">
//     <intent-filter>
//         <action android:name="android.intent.action.BOOT_COMPLETED" />
//     </intent-filter>
// </receiver>`,
    principles: [
      "onReceive נקרא ב-Main Thread - לא לעבודה כבדה",
      "רישום וביטול רישום לפי מחזור חיים",
      "LocalBroadcastManager לתקשורת פנימית",
      "הגבלות על Manifest receivers מאנדרואיד 8"
    ],
    tips: [
      "בטל רישום ב-onPause/onDestroy",
      "השתמש ב-LocalBroadcastManager כשאפשר",
      "onReceive צריך להסתיים מהר"
    ]
  },
  {
    id: "shared-preferences",
    name: "SharedPreferences",
    nameEn: "SharedPreferences",
    category: "combined",
    points: 0.5,
    description: "שמירת הגדרות פשוטות בפורמט key-value.",
    theory: `SharedPreferences מאפשר שמירת נתונים פשוטים שנשמרים גם אחרי סגירת האפליקציה.

מתאים ל:
• הגדרות משתמש
• מצב התחברות
• נתונים קטנים

סוגי נתונים נתמכים:
• String, int, float, long, boolean
• Set<String>`,
    codeExample: `// שמירת נתונים
SharedPreferences prefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
SharedPreferences.Editor editor = prefs.edit();

editor.putString("username", "user123");
editor.putInt("score", 100);
editor.putBoolean("isLoggedIn", true);
editor.apply(); // אסינכרוני (מומלץ)
// או editor.commit(); // סינכרוני

// קריאת נתונים
String username = prefs.getString("username", "אורח"); // ערך ברירת מחדל
int score = prefs.getInt("score", 0);
boolean isLoggedIn = prefs.getBoolean("isLoggedIn", false);

// מחיקת ערך
editor.remove("username");
editor.apply();

// מחיקת הכל
editor.clear();
editor.apply();

// מחלקת עזר לניהול Preferences
public class PrefsManager {
    private static final String PREFS_NAME = "AppPrefs";
    private SharedPreferences prefs;
    private SharedPreferences.Editor editor;
    
    public PrefsManager(Context context) {
        prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }
    
    public void setUsername(String username) {
        editor.putString("username", username);
        editor.apply();
    }
    
    public String getUsername() {
        return prefs.getString("username", null);
    }
    
    public void setLoggedIn(boolean loggedIn) {
        editor.putBoolean("isLoggedIn", loggedIn);
        editor.apply();
    }
    
    public boolean isLoggedIn() {
        return prefs.getBoolean("isLoggedIn", false);
    }
    
    public void clearAll() {
        editor.clear();
        editor.apply();
    }
}`,
    principles: [
      "apply() אסינכרוני ומומלץ",
      "commit() סינכרוני ומחזיר boolean",
      "ערך ברירת מחדל בקריאה",
      "MODE_PRIVATE לאבטחה"
    ],
    tips: [
      "צור מחלקת עזר לניהול",
      "השתמש בקבועים לשמות מפתחות",
      "לא מתאים לנתונים גדולים - השתמש ב-SQLite"
    ]
  },
  {
    id: "camera-gallery",
    name: "Camera & Gallery",
    nameEn: "Camera & Gallery",
    category: "combined",
    points: 0.5,
    description: "גישה למצלמה ולגלריית התמונות.",
    theory: `שימוש במצלמה ובגלריה לצילום ובחירת תמונות.

אפשרויות:
• Intent למצלמה/גלריה - פשוט ומהיר
• Camera2 API - שליטה מלאה במצלמה

FileProvider:
• דרוש מאנדרואיד 7+ לשיתוף קבצים
• מאפשר גישה מאובטחת לקבצים`,
    codeExample: `// צילום תמונה עם Intent
private Uri photoUri;

private void takePhoto() {
    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    if (intent.resolveActivity(getPackageManager()) != null) {
        File photoFile = createImageFile();
        if (photoFile != null) {
            photoUri = FileProvider.getUriForFile(this,
                "com.example.app.fileprovider", photoFile);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
            startActivityForResult(intent, REQUEST_CAMERA);
        }
    }
}

private File createImageFile() {
    String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    String fileName = "IMG_" + timestamp;
    File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
    try {
        return File.createTempFile(fileName, ".jpg", storageDir);
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}

// בחירת תמונה מהגלריה
private void pickFromGallery() {
    Intent intent = new Intent(Intent.ACTION_PICK, 
        MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
    startActivityForResult(intent, REQUEST_GALLERY);
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    
    if (resultCode == RESULT_OK) {
        if (requestCode == REQUEST_CAMERA) {
            // התמונה נשמרה ב-photoUri
            imageView.setImageURI(photoUri);
        } else if (requestCode == REQUEST_GALLERY && data != null) {
            Uri selectedImage = data.getData();
            imageView.setImageURI(selectedImage);
        }
    }
}

// FileProvider ב-Manifest
// <provider
//     android:name="androidx.core.content.FileProvider"
//     android:authorities="com.example.app.fileprovider"
//     android:exported="false"
//     android:grantUriPermissions="true">
//     <meta-data
//         android:name="android.support.FILE_PROVIDER_PATHS"
//         android:resource="@xml/file_paths" />
// </provider>

// res/xml/file_paths.xml
// <paths>
//     <external-files-path name="images" path="Pictures" />
// </paths>`,
    principles: [
      "FileProvider לשיתוף קבצים מאובטח",
      "Intent לפעולות פשוטות",
      "טיפול בהרשאות מצלמה ואחסון",
      "יצירת קבצים זמניים לתמונות"
    ],
    tips: [
      "בדוק הרשאות CAMERA ו-READ_EXTERNAL_STORAGE",
      "השתמש ב-FileProvider מאנדרואיד 7+",
      "שמור על גודל סביר של תמונות"
    ]
  },
  {
    id: "gps",
    name: "GPS",
    nameEn: "GPS",
    category: "combined",
    points: 0.5,
    description: "קבלת מיקום המשתמש באמצעות GPS.",
    theory: `שירותי מיקום מאפשרים לדעת היכן המשתמש נמצא.

ספקי מיקום:
• GPS - מדויק אך צורך סוללה ודורש שמיים פתוחים
• Network - פחות מדויק אך זמין בבניינים
• Fused Location - משלב הכל בצורה חכמה (מומלץ)

הרשאות:
• ACCESS_FINE_LOCATION - GPS מדויק
• ACCESS_COARSE_LOCATION - מיקום משוער`,
    codeExample: `public class LocationActivity extends AppCompatActivity {
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        
        // הגדרת callback לעדכוני מיקום
        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult != null) {
                    for (Location location : locationResult.getLocations()) {
                        updateLocationUI(location);
                    }
                }
            }
        };
        
        checkPermissionAndGetLocation();
    }
    
    private void checkPermissionAndGetLocation() {
        if (ContextCompat.checkSelfPermission(this, 
                Manifest.permission.ACCESS_FINE_LOCATION) 
                != PackageManager.PERMISSION_GRANTED) {
            
            ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        } else {
            getLastLocation();
            startLocationUpdates();
        }
    }
    
    private void getLastLocation() {
        fusedLocationClient.getLastLocation()
            .addOnSuccessListener(location -> {
                if (location != null) {
                    updateLocationUI(location);
                }
            });
    }
    
    private void startLocationUpdates() {
        LocationRequest request = LocationRequest.create()
            .setInterval(10000)           // כל 10 שניות
            .setFastestInterval(5000)     // מינימום 5 שניות
            .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        
        fusedLocationClient.requestLocationUpdates(request, 
            locationCallback, Looper.getMainLooper());
    }
    
    private void stopLocationUpdates() {
        fusedLocationClient.removeLocationUpdates(locationCallback);
    }
    
    private void updateLocationUI(Location location) {
        double lat = location.getLatitude();
        double lng = location.getLongitude();
        float accuracy = location.getAccuracy();
        
        textView.setText(String.format("מיקום: %.6f, %.6f (דיוק: %.0fm)", 
            lat, lng, accuracy));
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        stopLocationUpdates();
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        if (hasPermission()) {
            startLocationUpdates();
        }
    }
}`,
    principles: [
      "FusedLocationProviderClient - הדרך המומלצת",
      "בקשת הרשאות בזמן ריצה",
      "עצירת עדכונים ב-onPause לחיסכון בסוללה",
      "LocationRequest להגדרת תדירות ודיוק"
    ],
    tips: [
      "עצור עדכונים כשלא צריך",
      "השתמש ב-PRIORITY מתאים לצרכים",
      "טפל במקרה שאין מיקום זמין"
    ]
  },
  {
    id: "text-to-speech",
    name: "TextToSpeech",
    nameEn: "TextToSpeech",
    category: "combined",
    points: 0.5,
    description: "המרת טקסט לדיבור.",
    theory: `TextToSpeech (TTS) מאפשר לאפליקציה לדבר.

יכולות:
• תמיכה בשפות שונות
• שליטה במהירות וגובה הקול
• האזנה לאירועי סיום דיבור

שימושים:
• נגישות
• הנחיות ניווט
• קריאת תוכן`,
    codeExample: `public class TTSActivity extends AppCompatActivity 
        implements TextToSpeech.OnInitListener {
    
    private TextToSpeech tts;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // אתחול TTS
        tts = new TextToSpeech(this, this);
    }
    
    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            // הגדרת שפה
            int result = tts.setLanguage(new Locale("he", "IL"));
            
            if (result == TextToSpeech.LANG_MISSING_DATA ||
                result == TextToSpeech.LANG_NOT_SUPPORTED) {
                Toast.makeText(this, "השפה לא נתמכת", Toast.LENGTH_SHORT).show();
            } else {
                // מוכן לשימוש
                speakButton.setEnabled(true);
            }
        }
    }
    
    private void speak(String text) {
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "utteranceId");
    }
    
    private void speakWithSettings(String text) {
        // מהירות (0.5 = חצי, 1 = רגיל, 2 = כפול)
        tts.setSpeechRate(1.0f);
        
        // גובה קול
        tts.setPitch(1.0f);
        
        // דיבור
        tts.speak(text, TextToSpeech.QUEUE_ADD, null, "id1");
    }
    
    // האזנה לסיום דיבור
    private void setupListener() {
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
                // התחיל לדבר
            }
            
            @Override
            public void onDone(String utteranceId) {
                // סיים לדבר
                runOnUiThread(() -> {
                    Toast.makeText(TTSActivity.this, 
                        "סיים לדבר", Toast.LENGTH_SHORT).show();
                });
            }
            
            @Override
            public void onError(String utteranceId) {
                // שגיאה
            }
        });
    }
    
    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}`,
    principles: [
      "אתחול אסינכרוני - המתנה ל-onInit",
      "בדיקת תמיכה בשפה",
      "shutdown() בסגירה לשחרור משאבים",
      "QUEUE_FLUSH/QUEUE_ADD לשליטה בתור"
    ],
    tips: [
      "בדוק אם השפה נתמכת לפני שימוש",
      "עצור ושחרר ב-onDestroy",
      "השתמש ב-UtteranceProgressListener לסנכרון"
    ]
  },
  {
    id: "speech-to-text",
    name: "SpeechToText",
    nameEn: "SpeechToText",
    category: "combined",
    points: 0.5,
    description: "זיהוי דיבור והמרה לטקסט.",
    theory: `זיהוי דיבור מאפשר קלט קולי מהמשתמש.

עקרונות:
• שימוש ב-Intent לזיהוי דיבור
• דורש חיבור אינטרנט (ברוב המקרים)
• תוצאות יכולות להיות מרובות (דירוג)`,
    codeExample: `public class SpeechActivity extends AppCompatActivity {
    private static final int REQUEST_SPEECH = 1;
    
    private void startSpeechRecognition() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        
        // הגדרת שפה
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "he-IL");
        
        // הודעה למשתמש
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "דבר עכשיו...");
        
        // מספר תוצאות מקסימלי
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
        
        try {
            startActivityForResult(intent, REQUEST_SPEECH);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "זיהוי דיבור לא נתמך", Toast.LENGTH_SHORT).show();
        }
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        
        if (requestCode == REQUEST_SPEECH && resultCode == RESULT_OK && data != null) {
            ArrayList<String> results = 
                data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            
            if (results != null && !results.isEmpty()) {
                // התוצאה הטובה ביותר
                String bestResult = results.get(0);
                textView.setText(bestResult);
                
                // כל התוצאות (ממוינות לפי סבירות)
                for (int i = 0; i < results.size(); i++) {
                    Log.d("Speech", "אפשרות " + i + ": " + results.get(i));
                }
            }
        }
    }
    
    // זיהוי מתמשך (מתקדם)
    private SpeechRecognizer speechRecognizer;
    
    private void setupContinuousRecognition() {
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(new RecognitionListener() {
            @Override
            public void onResults(Bundle results) {
                ArrayList<String> matches = 
                    results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (matches != null && !matches.isEmpty()) {
                    textView.setText(matches.get(0));
                }
            }
            
            @Override
            public void onPartialResults(Bundle partialResults) {
                // תוצאות חלקיות בזמן אמת
            }
            
            // שאר המתודות...
            @Override public void onReadyForSpeech(Bundle params) {}
            @Override public void onBeginningOfSpeech() {}
            @Override public void onRmsChanged(float rmsdB) {}
            @Override public void onBufferReceived(byte[] buffer) {}
            @Override public void onEndOfSpeech() {}
            @Override public void onError(int error) {}
            @Override public void onEvent(int eventType, Bundle params) {}
        });
    }
    
    @Override
    protected void onDestroy() {
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        super.onDestroy();
    }
}`,
    principles: [
      "Intent לזיהוי פשוט",
      "SpeechRecognizer לזיהוי מתמשך",
      "תוצאות מרובות ממויינות לפי סבירות",
      "טיפול בשגיאות וחוסר תמיכה"
    ],
    tips: [
      "בדוק זמינות לפני הפעלה",
      "הרשאת RECORD_AUDIO נדרשת",
      "הרס את SpeechRecognizer ב-onDestroy"
    ]
  },
  {
    id: "countdown-timer",
    name: "CountDownTimer",
    nameEn: "CountDownTimer",
    category: "combined",
    points: 0.5,
    description: "ספירה לאחור עם עדכונים תקופתיים.",
    theory: `CountDownTimer מספק דרך פשוטה לספירה לאחור עם callbacks.

יתרונות:
• פשוט לשימוש
• Callbacks מובנים
• רץ ב-Main Thread (מאפשר עדכון UI)`,
    codeExample: `// CountDownTimer בסיסי
CountDownTimer timer = new CountDownTimer(60000, 1000) { // 60 שניות, עדכון כל שנייה
    @Override
    public void onTick(long millisUntilFinished) {
        // נקרא בכל עדכון
        long seconds = millisUntilFinished / 1000;
        textView.setText("נותרו: " + seconds + " שניות");
    }
    
    @Override
    public void onFinish() {
        // נקרא בסיום
        textView.setText("הזמן נגמר!");
        playSound();
    }
};

timer.start();

// ביטול
timer.cancel();

// Timer מותאם אישית
public class GameTimer {
    private CountDownTimer timer;
    private long timeRemaining;
    private boolean isPaused = false;
    private TimerListener listener;
    
    public interface TimerListener {
        void onTick(long secondsRemaining);
        void onFinish();
    }
    
    public GameTimer(long durationMillis, TimerListener listener) {
        this.timeRemaining = durationMillis;
        this.listener = listener;
    }
    
    public void start() {
        timer = new CountDownTimer(timeRemaining, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                timeRemaining = millisUntilFinished;
                listener.onTick(millisUntilFinished / 1000);
            }
            
            @Override
            public void onFinish() {
                listener.onFinish();
            }
        };
        timer.start();
        isPaused = false;
    }
    
    public void pause() {
        if (timer != null && !isPaused) {
            timer.cancel();
            isPaused = true;
        }
    }
    
    public void resume() {
        if (isPaused) {
            start();
        }
    }
    
    public void cancel() {
        if (timer != null) {
            timer.cancel();
        }
    }
}

// שימוש
GameTimer gameTimer = new GameTimer(120000, new GameTimer.TimerListener() {
    @Override
    public void onTick(long secondsRemaining) {
        timerTextView.setText(formatTime(secondsRemaining));
    }
    
    @Override
    public void onFinish() {
        showGameOver();
    }
});

gameTimer.start();`,
    principles: [
      "זמן כולל ומרווח עדכון",
      "onTick לעדכונים שוטפים",
      "onFinish בסיום",
      "cancel() לעצירה"
    ],
    tips: [
      "זכור לבטל ב-onPause/onDestroy",
      "צור wrapper להשהייה והמשך",
      "עצב זמן בפורמט קריא למשתמש"
    ]
  },
  {
    id: "handler",
    name: "Handler",
    nameEn: "Handler",
    category: "combined",
    points: 0.5,
    description: "תזמון והעברת הודעות בין Threads.",
    theory: `Handler מאפשר:
• שליחת הודעות בין Threads
• תזמון פעולות עתידיות
• יצירת לולאות עדכון

שימושים נפוצים:
• חזרה ל-UI Thread מ-Background
• השהיית פעולות
• משימות מחזוריות`,
    codeExample: `// Handler ב-Main Thread
Handler mainHandler = new Handler(Looper.getMainLooper());

// הרצה מושהית
mainHandler.postDelayed(() -> {
    // יקרה אחרי 3 שניות
    showMessage();
}, 3000);

// הרצה חוזרת (כמו setInterval)
private Handler handler = new Handler();
private Runnable updateRunnable = new Runnable() {
    @Override
    public void run() {
        updateUI();
        handler.postDelayed(this, 1000); // כל שנייה
    }
};

// התחלה
handler.post(updateRunnable);

// עצירה
handler.removeCallbacks(updateRunnable);

// Handler עם Messages
private Handler messageHandler = new Handler(Looper.getMainLooper()) {
    @Override
    public void handleMessage(Message msg) {
        switch (msg.what) {
            case MSG_UPDATE_PROGRESS:
                int progress = msg.arg1;
                progressBar.setProgress(progress);
                break;
            case MSG_DOWNLOAD_COMPLETE:
                String result = (String) msg.obj;
                showResult(result);
                break;
        }
    }
};

// שליחת Message
new Thread(() -> {
    for (int i = 0; i <= 100; i += 10) {
        Message msg = Message.obtain();
        msg.what = MSG_UPDATE_PROGRESS;
        msg.arg1 = i;
        messageHandler.sendMessage(msg);
        
        try { Thread.sleep(500); } catch (Exception e) {}
    }
    
    Message complete = Message.obtain();
    complete.what = MSG_DOWNLOAD_COMPLETE;
    complete.obj = "הסתיים בהצלחה!";
    messageHandler.sendMessage(complete);
}).start();

// ניקוי - חשוב למנוע memory leaks
@Override
protected void onDestroy() {
    super.onDestroy();
    handler.removeCallbacksAndMessages(null);
}`,
    principles: [
      "Looper.getMainLooper() לגישה ל-Main Thread",
      "post/postDelayed להרצת Runnable",
      "Message לתקשורת מורכבת יותר",
      "removeCallbacks למניעת leaks"
    ],
    tips: [
      "נקה callbacks ב-onDestroy",
      "השתמש ב-WeakReference למניעת leaks",
      "הימנע מ-Handler אנונימי ב-Activity"
    ]
  },
  {
    id: "microphone",
    name: "Microphone",
    nameEn: "Microphone",
    category: "combined",
    points: 0.5,
    description: "הקלטת אודיו מהמיקרופון.",
    theory: `MediaRecorder מאפשר הקלטת אודיו לקובץ.

שלבים:
1. יצירת MediaRecorder
2. הגדרת מקור, פורמט וקידוד
3. הגדרת קובץ פלט
4. התחלת הקלטה
5. עצירה ושחרור`,
    codeExample: `public class RecordingActivity extends AppCompatActivity {
    private MediaRecorder recorder;
    private String outputFile;
    private boolean isRecording = false;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        outputFile = getExternalFilesDir(null).getAbsolutePath() + "/recording.3gp";
    }
    
    private void startRecording() {
        // בדיקת הרשאה
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.RECORD_AUDIO}, 1);
            return;
        }
        
        recorder = new MediaRecorder();
        recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        recorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
        recorder.setOutputFile(outputFile);
        
        try {
            recorder.prepare();
            recorder.start();
            isRecording = true;
            Toast.makeText(this, "מקליט...", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void stopRecording() {
        if (recorder != null && isRecording) {
            recorder.stop();
            recorder.release();
            recorder = null;
            isRecording = false;
            Toast.makeText(this, "הקלטה נשמרה", Toast.LENGTH_SHORT).show();
        }
    }
    
    // הפעלת ההקלטה
    private void playRecording() {
        MediaPlayer player = new MediaPlayer();
        try {
            player.setDataSource(outputFile);
            player.prepare();
            player.start();
            
            player.setOnCompletionListener(mp -> {
                mp.release();
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    protected void onStop() {
        super.onStop();
        if (isRecording) {
            stopRecording();
        }
    }
}`,
    principles: [
      "בקשת הרשאת RECORD_AUDIO",
      "סדר הגדרות: source -> format -> encoder -> output",
      "prepare() לפני start()",
      "release() לשחרור משאבים"
    ],
    tips: [
      "שחרר MediaRecorder בסיום",
      "טפל ב-IOException בהכנה",
      "עצור הקלטה ב-onStop"
    ]
  },
  // Firebase Extensions
  {
    id: "firebase-auth",
    name: "Firebase Authentication",
    nameEn: "Firebase Authentication",
    category: "required",
    points: 1,
    description: "מערכת אימות משתמשים מבוססת ענן עם תמיכה במגוון שיטות התחברות.",
    theory: `Firebase Authentication מספק שירות אימות משתמשים מלא ומאובטח.

יתרונות Firebase Auth:
• אימות מוכן לשימוש - לא צריך לבנות שרת
• תמיכה במגוון שיטות: אימייל/סיסמה, Google, Facebook, טלפון
• ניהול אוטומטי של tokens ו-sessions
• אבטחה ברמה גבוהה (הצפנה, הגנה מפני התקפות)
• סנכרון עם שירותי Firebase אחרים

מושגים מרכזיים:
• FirebaseAuth - הclass הראשי לאימות
• FirebaseUser - מייצג משתמש מחובר
• AuthStateListener - מאזין לשינויי מצב התחברות
• Credentials - אישורי התחברות

שיטות אימות נפוצות:
• Email/Password - הכי נפוץ ופשוט
• Google Sign-In - התחברות חברתית
• Phone Authentication - SMS
• Anonymous - משתמש אנונימי זמני`,
    codeExample: `// ========== הגדרת Firebase בפרויקט ==========
// 1. הוסף ל-build.gradle (project level):
// classpath 'com.google.gms:google-services:4.3.15'

// 2. הוסף ל-build.gradle (app level):
// implementation 'com.google.firebase:firebase-auth:22.1.0'
// apply plugin: 'com.google.gms.google-services'

// 3. הורד google-services.json מ-Firebase Console ושים ב-app folder

// ========== אתחול Firebase ==========
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        FirebaseApp.initializeApp(this);
    }
}

// ========== הרשמה (Sign Up) ==========
private void registerUser(String email, String password) {
    FirebaseAuth auth = FirebaseAuth.getInstance();
    
    auth.createUserWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, task -> {
            if (task.isSuccessful()) {
                // הרשמה הצליחה
                FirebaseUser user = auth.getCurrentUser();
                Toast.makeText(this, "נרשמת בהצלחה!", Toast.LENGTH_SHORT).show();
                
                // שליחת אימייל אימות (אופציונלי)
                user.sendEmailVerification()
                    .addOnCompleteListener(emailTask -> {
                        if (emailTask.isSuccessful()) {
                            Toast.makeText(this, "אימייל אימות נשלח", 
                                Toast.LENGTH_SHORT).show();
                        }
                    });
            } else {
                // טיפול בשגיאות
                String error = task.getException().getMessage();
                Toast.makeText(this, "שגיאה: " + error, Toast.LENGTH_LONG).show();
            }
        });
}

// ========== התחברות (Login) ==========
private void loginUser(String email, String password) {
    FirebaseAuth auth = FirebaseAuth.getInstance();
    
    auth.signInWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, task -> {
            if (task.isSuccessful()) {
                // התחברות הצליחה
                FirebaseUser user = auth.getCurrentUser();
                Toast.makeText(this, "שלום " + user.getEmail(), 
                    Toast.LENGTH_SHORT).show();
                
                // מעבר למסך הראשי
                startActivity(new Intent(this, MainActivity.class));
                finish();
            } else {
                Toast.makeText(this, "שם משתמש או סיסמה שגויים", 
                    Toast.LENGTH_SHORT).show();
            }
        });
}

// ========== התנתקות (Logout) ==========
private void logoutUser() {
    FirebaseAuth.getInstance().signOut();
    Toast.makeText(this, "התנתקת בהצלחה", Toast.LENGTH_SHORT).show();
    startActivity(new Intent(this, LoginActivity.class));
    finish();
}

// ========== שינוי סיסמה ==========
private void changePassword(String newPassword) {
    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
    
    if (user != null) {
        user.updatePassword(newPassword)
            .addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    Toast.makeText(this, "הסיסמה שונתה בהצלחה", 
                        Toast.LENGTH_SHORT).show();
                } else {
                    // ייתכן שצריך להתחבר מחדש לפני שינוי סיסמה
                    Toast.makeText(this, "שגיאה: " + task.getException().getMessage(), 
                        Toast.LENGTH_SHORT).show();
                }
            });
    }
}

// ========== איפוס סיסמה (שכחתי סיסמה) ==========
private void resetPassword(String email) {
    FirebaseAuth auth = FirebaseAuth.getInstance();
    
    auth.sendPasswordResetEmail(email)
        .addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Toast.makeText(this, 
                    "אימייל לאיפוס סיסמה נשלח ל-" + email, 
                    Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(this, "שגיאה: " + task.getException().getMessage(), 
                    Toast.LENGTH_SHORT).show();
            }
        });
}

// ========== מאזין לשינויי מצב התחברות ==========
private FirebaseAuth.AuthStateListener authListener;

@Override
protected void onStart() {
    super.onStart();
    
    authListener = firebaseAuth -> {
        FirebaseUser user = firebaseAuth.getCurrentUser();
        if (user != null) {
            // המשתמש מחובר
            Log.d("Auth", "משתמש מחובר: " + user.getEmail());
        } else {
            // המשתמש לא מחובר
            Log.d("Auth", "משתמש לא מחובר");
        }
    };
    
    FirebaseAuth.getInstance().addAuthStateListener(authListener);
}

@Override
protected void onStop() {
    super.onStop();
    if (authListener != null) {
        FirebaseAuth.getInstance().removeAuthStateListener(authListener);
    }
}

// ========== בדיקה אם משתמש מחובר ==========
private boolean isUserLoggedIn() {
    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
    return user != null;
}

// ========== קבלת פרטי המשתמש ==========
private void getUserDetails() {
    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
    
    if (user != null) {
        String uid = user.getUid();           // מזהה ייחודי
        String email = user.getEmail();       // אימייל
        String name = user.getDisplayName();  // שם (אם הוגדר)
        Uri photo = user.getPhotoUrl();       // תמונה (אם הוגדרה)
        boolean verified = user.isEmailVerified(); // האם האימייל אומת
    }
}`,
    principles: [
      "FirebaseAuth.getInstance() - נקודת כניסה יחידה לשירות",
      "Callbacks אסינכרוניים - כל פעולה מחזירה Task",
      "AuthStateListener - מאזין לשינויים במצב ההתחברות",
      "טיפול בשגיאות - תמיד לטפל ב-task.getException()"
    ],
    tips: [
      "הוסף google-services.json לפרויקט",
      "הפעל את Email/Password Authentication ב-Firebase Console",
      "שקול לשלוח אימייל אימות למשתמשים חדשים",
      "השתמש ב-AuthStateListener במקום לבדוק ידנית"
    ]
  },
  {
    id: "firebase-realtime-db",
    name: "Firebase Realtime Database",
    nameEn: "Firebase Realtime Database",
    category: "required",
    points: 1,
    description: "מסד נתונים בזמן אמת בענן עם סנכרון אוטומטי בין מכשירים.",
    theory: `Firebase Realtime Database הוא מסד נתונים NoSQL בענן.

מאפיינים עיקריים:
• סנכרון בזמן אמת - שינויים מתעדכנים מיד בכל המכשירים
• עבודה אופליין - נתונים נשמרים מקומית ומסתנכרנים כשחוזר חיבור
• מבנה JSON - נתונים מאוחסנים כעץ JSON
• ללא שרת - גישה ישירה מהאפליקציה

מושגים מרכזיים:
• DatabaseReference - הפניה לנתיב במסד
• ValueEventListener - מאזין לשינויים
• ChildEventListener - מאזין לשינויים ברשימות
• DataSnapshot - תמונת מצב של הנתונים

מבנה הנתונים:
• מבוסס על נתיבים (paths) כמו מערכת קבצים
• לדוגמה: /users/user123/name
• נתונים מאורגנים כעץ JSON`,
    codeExample: `// ========== הגדרה ==========
// הוסף ל-build.gradle (app level):
// implementation 'com.google.firebase:firebase-database:20.2.2'

// ========== אתחול והפניות ==========
FirebaseDatabase database = FirebaseDatabase.getInstance();
DatabaseReference rootRef = database.getReference();

// הפניה לנתיב ספציפי
DatabaseReference usersRef = database.getReference("users");
DatabaseReference specificUserRef = database.getReference("users/user123");

// ========== יצירת מסמך/רשומה חדשה ==========
// שיטה 1: עם מזהה ידני
private void createUserManualId(String oderId, String name, String email) {
    DatabaseReference userRef = database.getReference("users").child(userId);
    
    // יצירת אובייקט User
    User user = new User(name, email);
    
    userRef.setValue(user)
        .addOnSuccessListener(aVoid -> {
            Toast.makeText(this, "משתמש נוצר בהצלחה", Toast.LENGTH_SHORT).show();
        })
        .addOnFailureListener(e -> {
            Toast.makeText(this, "שגיאה: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        });
}

// שיטה 2: עם מזהה אוטומטי (push)
private void createUserAutoId(String name, String email) {
    DatabaseReference usersRef = database.getReference("users");
    
    // push() יוצר מזהה ייחודי
    String newUserId = usersRef.push().getKey();
    
    User user = new User(name, email);
    user.setId(newUserId);
    
    usersRef.child(newUserId).setValue(user)
        .addOnSuccessListener(aVoid -> {
            Log.d("Firebase", "נוצר משתמש עם ID: " + newUserId);
        });
}

// ========== הוספת מסמך (כמו הוספה לרשימה) ==========
private void addTask(String title, boolean completed) {
    DatabaseReference tasksRef = database.getReference("tasks");
    
    String taskId = tasksRef.push().getKey();
    
    Map<String, Object> task = new HashMap<>();
    task.put("id", taskId);
    task.put("title", title);
    task.put("completed", completed);
    task.put("createdAt", ServerValue.TIMESTAMP); // זמן שרת
    
    tasksRef.child(taskId).setValue(task);
}

// ========== עדכון מסמך ==========
// עדכון שדה ספציפי
private void updateTaskTitle(String taskId, String newTitle) {
    DatabaseReference taskRef = database.getReference("tasks").child(taskId);
    
    taskRef.child("title").setValue(newTitle)
        .addOnSuccessListener(aVoid -> {
            Toast.makeText(this, "עודכן בהצלחה", Toast.LENGTH_SHORT).show();
        });
}

// עדכון מספר שדות בבת אחת
private void updateMultipleFields(String taskId, String title, boolean completed) {
    DatabaseReference taskRef = database.getReference("tasks").child(taskId);
    
    Map<String, Object> updates = new HashMap<>();
    updates.put("title", title);
    updates.put("completed", completed);
    updates.put("updatedAt", ServerValue.TIMESTAMP);
    
    taskRef.updateChildren(updates);
}

// ========== מחיקת מסמך ==========
private void deleteTask(String taskId) {
    DatabaseReference taskRef = database.getReference("tasks").child(taskId);
    
    taskRef.removeValue()
        .addOnSuccessListener(aVoid -> {
            Toast.makeText(this, "נמחק בהצלחה", Toast.LENGTH_SHORT).show();
        })
        .addOnFailureListener(e -> {
            Toast.makeText(this, "שגיאה במחיקה", Toast.LENGTH_SHORT).show();
        });
}

// ========== שליפת נתונים - פעם אחת ==========
private void getTaskOnce(String taskId) {
    DatabaseReference taskRef = database.getReference("tasks").child(taskId);
    
    taskRef.get().addOnCompleteListener(task -> {
        if (task.isSuccessful()) {
            DataSnapshot snapshot = task.getResult();
            if (snapshot.exists()) {
                String title = snapshot.child("title").getValue(String.class);
                Boolean completed = snapshot.child("completed").getValue(Boolean.class);
                
                Log.d("Firebase", "משימה: " + title);
            } else {
                Log.d("Firebase", "משימה לא נמצאה");
            }
        }
    });
}

// ========== שליפת נתונים - בזמן אמת ==========
private ValueEventListener tasksListener;

private void listenToTasks() {
    DatabaseReference tasksRef = database.getReference("tasks");
    
    tasksListener = new ValueEventListener() {
        @Override
        public void onDataChange(DataSnapshot snapshot) {
            ArrayList<Task> tasksList = new ArrayList<>();
            
            for (DataSnapshot taskSnapshot : snapshot.getChildren()) {
                Task task = taskSnapshot.getValue(Task.class);
                tasksList.add(task);
            }
            
            // עדכון ה-UI
            updateTasksUI(tasksList);
        }
        
        @Override
        public void onCancelled(DatabaseError error) {
            Log.e("Firebase", "שגיאה: " + error.getMessage());
        }
    };
    
    tasksRef.addValueEventListener(tasksListener);
}

// ביטול האזנה
@Override
protected void onDestroy() {
    super.onDestroy();
    if (tasksListener != null) {
        database.getReference("tasks").removeEventListener(tasksListener);
    }
}

// ========== שליפה עם מסנן ==========
// לפי ערך שדה
private void getCompletedTasks() {
    DatabaseReference tasksRef = database.getReference("tasks");
    
    tasksRef.orderByChild("completed").equalTo(true)
        .addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                for (DataSnapshot taskSnapshot : snapshot.getChildren()) {
                    Task task = taskSnapshot.getValue(Task.class);
                    Log.d("Firebase", "משימה שהושלמה: " + task.getTitle());
                }
            }
            
            @Override
            public void onCancelled(DatabaseError error) {}
        });
}

// הגבלת תוצאות
private void getFirstFiveTasks() {
    database.getReference("tasks")
        .orderByChild("createdAt")
        .limitToFirst(5)
        .addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                // 5 המשימות הראשונות
            }
            
            @Override
            public void onCancelled(DatabaseError error) {}
        });
}

// ========== מחלקת מודל ==========
public class Task {
    private String id;
    private String title;
    private boolean completed;
    private long createdAt;
    
    // Constructor ריק נדרש ל-Firebase
    public Task() {}
    
    public Task(String title, boolean completed) {
        this.title = title;
        this.completed = completed;
    }
    
    // Getters and Setters...
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}`,
    principles: [
      "DatabaseReference - כל פעולה מתבצעת על הפניה לנתיב",
      "push() - יצירת מזהה ייחודי אוטומטי",
      "ValueEventListener - קבלת עדכונים בזמן אמת",
      "Constructor ריק - נדרש לכל מחלקת מודל"
    ],
    tips: [
      "השתמש ב-push() למזהים אוטומטיים",
      "בטל listeners ב-onDestroy למניעת memory leaks",
      "הפעל Rules ב-Firebase Console לאבטחה",
      "השתמש ב-ServerValue.TIMESTAMP לזמנים"
    ]
  },
  {
    id: "firebase-firestore",
    name: "Firebase Cloud Firestore",
    nameEn: "Firebase Cloud Firestore",
    category: "required",
    points: 1,
    description: "מסד נתונים מסמכים (NoSQL) מתקדם עם שאילתות חזקות.",
    theory: `Cloud Firestore הוא מסד נתונים NoSQL מתקדם יותר מ-Realtime Database.

הבדלים מ-Realtime Database:
• מבנה: אוספים (Collections) ומסמכים (Documents) במקום עץ JSON
• שאילתות: תמיכה בשאילתות מורכבות יותר
• סקלאביליות: מתאים ליותר נתונים ומשתמשים
• מחיר: תשלום לפי פעולות (קריאות, כתיבות)

מבנה הנתונים:
• Collection (אוסף) - קבוצה של מסמכים (כמו טבלה)
• Document (מסמך) - רשומה בודדת עם שדות (כמו שורה)
• Subcollection - אוסף בתוך מסמך

מתי להשתמש בכל אחד:
• Realtime DB: סנכרון פשוט, נתונים קטנים, מחיר לפי bandwidth
• Firestore: שאילתות מורכבות, נתונים גדולים, מבנה מורכב`,
    codeExample: `// ========== הגדרה ==========
// implementation 'com.google.firebase:firebase-firestore:24.7.0'

// ========== אתחול ==========
FirebaseFirestore db = FirebaseFirestore.getInstance();

// ========== יצירת מסמך חדש ==========
// עם מזהה ידני
private void createUser(String userId, String name, String email) {
    Map<String, Object> user = new HashMap<>();
    user.put("name", name);
    user.put("email", email);
    user.put("createdAt", FieldValue.serverTimestamp());
    
    db.collection("users").document(userId)
        .set(user)
        .addOnSuccessListener(aVoid -> {
            Log.d("Firestore", "משתמש נוצר בהצלחה");
        })
        .addOnFailureListener(e -> {
            Log.e("Firestore", "שגיאה: " + e.getMessage());
        });
}

// עם מזהה אוטומטי
private void createTask(String title) {
    Map<String, Object> task = new HashMap<>();
    task.put("title", title);
    task.put("completed", false);
    task.put("createdAt", FieldValue.serverTimestamp());
    
    db.collection("tasks")
        .add(task)
        .addOnSuccessListener(documentReference -> {
            String docId = documentReference.getId();
            Log.d("Firestore", "נוצר מסמך עם ID: " + docId);
        });
}

// ========== שליפת מסמך בודד ==========
private void getTask(String taskId) {
    db.collection("tasks").document(taskId)
        .get()
        .addOnSuccessListener(document -> {
            if (document.exists()) {
                String title = document.getString("title");
                Boolean completed = document.getBoolean("completed");
                
                // או המרה לאובייקט
                Task task = document.toObject(Task.class);
            } else {
                Log.d("Firestore", "מסמך לא נמצא");
            }
        });
}

// ========== שליפת כל המסמכים באוסף ==========
private void getAllTasks() {
    db.collection("tasks")
        .get()
        .addOnSuccessListener(querySnapshot -> {
            ArrayList<Task> tasks = new ArrayList<>();
            
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                Task task = document.toObject(Task.class);
                task.setId(document.getId());
                tasks.add(task);
            }
            
            updateUI(tasks);
        });
}

// ========== שליפה בזמן אמת ==========
private ListenerRegistration tasksListener;

private void listenToTasks() {
    tasksListener = db.collection("tasks")
        .addSnapshotListener((snapshots, error) -> {
            if (error != null) {
                Log.e("Firestore", "שגיאה: " + error.getMessage());
                return;
            }
            
            ArrayList<Task> tasks = new ArrayList<>();
            for (DocumentSnapshot doc : snapshots.getDocuments()) {
                Task task = doc.toObject(Task.class);
                task.setId(doc.getId());
                tasks.add(task);
            }
            
            updateUI(tasks);
        });
}

// ביטול האזנה
@Override
protected void onDestroy() {
    super.onDestroy();
    if (tasksListener != null) {
        tasksListener.remove();
    }
}

// ========== שאילתות מתקדמות ==========
// סינון
private void getCompletedTasks() {
    db.collection("tasks")
        .whereEqualTo("completed", true)
        .get()
        .addOnSuccessListener(querySnapshot -> {
            // משימות שהושלמו
        });
}

// מיון
private void getTasksSorted() {
    db.collection("tasks")
        .orderBy("createdAt", Query.Direction.DESCENDING)
        .limit(10)
        .get()
        .addOnSuccessListener(querySnapshot -> {
            // 10 המשימות האחרונות
        });
}

// שאילתה משולבת
private void getRecentUncompletedTasks() {
    db.collection("tasks")
        .whereEqualTo("completed", false)
        .orderBy("createdAt", Query.Direction.DESCENDING)
        .limit(5)
        .get()
        .addOnSuccessListener(querySnapshot -> {
            // 5 המשימות הלא-גמורות האחרונות
        });
}

// ========== עדכון מסמך ==========
private void updateTask(String taskId, String newTitle) {
    db.collection("tasks").document(taskId)
        .update("title", newTitle)
        .addOnSuccessListener(aVoid -> {
            Log.d("Firestore", "עודכן בהצלחה");
        });
}

// עדכון מספר שדות
private void updateMultipleFields(String taskId) {
    Map<String, Object> updates = new HashMap<>();
    updates.put("title", "כותרת חדשה");
    updates.put("completed", true);
    updates.put("updatedAt", FieldValue.serverTimestamp());
    
    db.collection("tasks").document(taskId)
        .update(updates);
}

// ========== מחיקת מסמך ==========
private void deleteTask(String taskId) {
    db.collection("tasks").document(taskId)
        .delete()
        .addOnSuccessListener(aVoid -> {
            Log.d("Firestore", "נמחק בהצלחה");
        });
}

// ========== Subcollections ==========
// הוספת משימה למשתמש ספציפי
private void addUserTask(String oderId, String taskTitle) {
    Map<String, Object> task = new HashMap<>();
    task.put("title", taskTitle);
    task.put("completed", false);
    
    db.collection("users").document(userId)
        .collection("tasks")  // subcollection
        .add(task);
}

// שליפת משימות של משתמש ספציפי
private void getUserTasks(String userId) {
    db.collection("users").document(userId)
        .collection("tasks")
        .get()
        .addOnSuccessListener(querySnapshot -> {
            // משימות של המשתמש הספציפי
        });
}`,
    principles: [
      "Collection/Document - מבנה היררכי ברור",
      "DocumentReference - הפניה למסמך ספציפי",
      "CollectionReference - הפניה לאוסף",
      "Query - שאילתות מורכבות עם whereEqualTo, orderBy, limit"
    ],
    tips: [
      "השתמש ב-toObject() להמרה אוטומטית",
      "צור אינדקסים לשאילתות מורכבות ב-Console",
      "בטל listeners ב-onDestroy",
      "השתמש ב-FieldValue.serverTimestamp() לזמנים"
    ]
  },
  {
    id: "firebase-multi-user",
    name: "Firebase מרובה משתמשים",
    nameEn: "Firebase Multi-User Realtime",
    category: "required",
    points: 1,
    description: "סנכרון בזמן אמת בין משתמשים שונים - שינוי במכשיר אחד מתעדכן מיד באחרים.",
    theory: `אחד היתרונות הגדולים של Firebase הוא היכולת לסנכרן נתונים בזמן אמת בין משתמשים שונים.

כיצד זה עובד?
• כל משתמש מאזין (listener) לנתיב ספציפי במסד הנתונים
• כאשר משתמש אחד משנה נתון - Firebase מודיע לכל המאזינים
• העדכון מגיע בזמן אמת לכל המכשירים המחוברים

תרחיש לדוגמה:
תלמיד א' משנה ערך במסד הנתונים מהסלולרי שלו
→ Firebase שולח הודעה לכל המאזינים
→ תלמיד ב' מקבל את העדכון באפליקציה שלו בזמן אמת

שימושים נפוצים:
• צ'אט בזמן אמת
• משחק רב משתתפים
• לוח שיתופי (whiteboard)
• עדכון סטטוס של משתמשים
• שיתוף רשימות (קניות, משימות)

עקרונות מרכזיים:
• Observer Pattern - מאזינים מקבלים עדכונים אוטומטית
• Push Model - השרת דוחף עדכונים (לא הלקוח שואל)
• ייעול תעבורה - רק השינויים נשלחים, לא כל הנתונים`,
    codeExample: `// ========================================
// דוגמה: לוח הודעות משותף בין תלמידים
// כל שינוי מתעדכן מיד אצל כל התלמידים
// ========================================

// ========== מחלקת הודעה ==========
public class Message {
    private String id;
    private String senderId;
    private String senderName;
    private String content;
    private long timestamp;
    
    // Constructor ריק נדרש ל-Firebase
    public Message() {}
    
    public Message(String senderId, String senderName, String content) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.content = content;
    }
    
    // Getters and Setters...
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}

// ========== Activity עם סנכרון בזמן אמת ==========
public class SharedBoardActivity extends AppCompatActivity {
    
    private FirebaseDatabase database;
    private DatabaseReference messagesRef;
    private ValueEventListener messagesListener;
    
    private RecyclerView recyclerView;
    private MessagesAdapter adapter;
    private ArrayList<Message> messagesList;
    private EditText editMessage;
    
    // פרטי המשתמש הנוכחי
    private String currentUserId;
    private String currentUserName;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shared_board);
        
        // אתחול Firebase
        database = FirebaseDatabase.getInstance();
        messagesRef = database.getReference("shared_board/messages");
        
        // קבלת פרטי המשתמש המחובר
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user != null) {
            currentUserId = user.getUid();
            currentUserName = user.getDisplayName();
        }
        
        // אתחול UI
        initViews();
        
        // התחלת האזנה להודעות בזמן אמת
        startListeningToMessages();
    }
    
    private void initViews() {
        recyclerView = findViewById(R.id.recyclerMessages);
        editMessage = findViewById(R.id.editMessage);
        Button btnSend = findViewById(R.id.btnSend);
        
        messagesList = new ArrayList<>();
        adapter = new MessagesAdapter(messagesList, currentUserId);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);
        
        btnSend.setOnClickListener(v -> sendMessage());
    }
    
    // ========================================
    // שליחת הודעה - תלמיד א' שולח
    // ========================================
    private void sendMessage() {
        String content = editMessage.getText().toString().trim();
        if (content.isEmpty()) return;
        
        // יצירת מזהה ייחודי להודעה
        String messageId = messagesRef.push().getKey();
        
        // יצירת אובייקט ההודעה
        Message message = new Message(currentUserId, currentUserName, content);
        message.setId(messageId);
        message.setTimestamp(System.currentTimeMillis());
        
        // שמירה ב-Firebase
        // ברגע שזה נשמר - כל המאזינים יקבלו הודעה!
        messagesRef.child(messageId).setValue(message)
            .addOnSuccessListener(aVoid -> {
                editMessage.setText(""); // ניקוי שדה הקלט
                Log.d("Firebase", "הודעה נשלחה בהצלחה");
            })
            .addOnFailureListener(e -> {
                Toast.makeText(this, "שגיאה בשליחה", Toast.LENGTH_SHORT).show();
            });
    }
    
    // ========================================
    // האזנה בזמן אמת - תלמיד ב' מקבל עדכונים
    // ========================================
    private void startListeningToMessages() {
        // יצירת מאזין לשינויים
        messagesListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                // נקרא בכל פעם שיש שינוי בנתונים!
                // זה קורה גם כשתלמיד אחר שולח הודעה
                
                messagesList.clear();
                
                for (DataSnapshot messageSnapshot : snapshot.getChildren()) {
                    Message message = messageSnapshot.getValue(Message.class);
                    if (message != null) {
                        messagesList.add(message);
                    }
                }
                
                // עדכון הרשימה ב-UI
                adapter.notifyDataSetChanged();
                
                // גלילה להודעה האחרונה
                if (!messagesList.isEmpty()) {
                    recyclerView.scrollToPosition(messagesList.size() - 1);
                }
                
                Log.d("Firebase", "התקבלו " + messagesList.size() + " הודעות");
            }
            
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e("Firebase", "שגיאה: " + error.getMessage());
            }
        };
        
        // הפעלת ההאזנה
        // מסודר לפי זמן יצירה
        messagesRef.orderByChild("timestamp")
            .addValueEventListener(messagesListener);
    }
    
    // ========================================
    // חשוב! ביטול ההאזנה כשיוצאים מהמסך
    // ========================================
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (messagesListener != null) {
            messagesRef.removeEventListener(messagesListener);
        }
    }
}

// ========================================
// דוגמה נוספת: ChildEventListener לעדכונים נקודתיים
// יעיל יותר כי מקבלים רק את השינוי, לא את כל הרשימה
// ========================================
private void startListeningWithChildEvents() {
    messagesRef.addChildEventListener(new ChildEventListener() {
        @Override
        public void onChildAdded(@NonNull DataSnapshot snapshot, String prevKey) {
            // הודעה חדשה נוספה! (תלמיד אחר שלח)
            Message message = snapshot.getValue(Message.class);
            messagesList.add(message);
            adapter.notifyItemInserted(messagesList.size() - 1);
            recyclerView.scrollToPosition(messagesList.size() - 1);
        }
        
        @Override
        public void onChildChanged(@NonNull DataSnapshot snapshot, String prevKey) {
            // הודעה עודכנה
            Message updated = snapshot.getValue(Message.class);
            for (int i = 0; i < messagesList.size(); i++) {
                if (messagesList.get(i).getId().equals(updated.getId())) {
                    messagesList.set(i, updated);
                    adapter.notifyItemChanged(i);
                    break;
                }
            }
        }
        
        @Override
        public void onChildRemoved(@NonNull DataSnapshot snapshot) {
            // הודעה נמחקה
            Message removed = snapshot.getValue(Message.class);
            for (int i = 0; i < messagesList.size(); i++) {
                if (messagesList.get(i).getId().equals(removed.getId())) {
                    messagesList.remove(i);
                    adapter.notifyItemRemoved(i);
                    break;
                }
            }
        }
        
        @Override
        public void onChildMoved(@NonNull DataSnapshot snapshot, String prevKey) {
            // סדר השתנה (בדרך כלל לא רלוונטי)
        }
        
        @Override
        public void onCancelled(@NonNull DatabaseError error) {
            Log.e("Firebase", "שגיאה: " + error.getMessage());
        }
    });
}

// ========================================
// Adapter לתצוגת ההודעות
// ========================================
public class MessagesAdapter extends RecyclerView.Adapter<MessagesAdapter.ViewHolder> {
    private ArrayList<Message> messages;
    private String currentUserId;
    
    public MessagesAdapter(ArrayList<Message> messages, String currentUserId) {
        this.messages = messages;
        this.currentUserId = currentUserId;
    }
    
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_message, parent, false);
        return new ViewHolder(view);
    }
    
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Message message = messages.get(position);
        
        holder.tvSender.setText(message.getSenderName());
        holder.tvContent.setText(message.getContent());
        
        // עיצוב שונה להודעות שלי vs הודעות של אחרים
        if (message.getSenderId().equals(currentUserId)) {
            holder.itemView.setBackgroundColor(Color.parseColor("#E3F2FD"));
        } else {
            holder.itemView.setBackgroundColor(Color.WHITE);
        }
    }
    
    @Override
    public int getItemCount() { return messages.size(); }
    
    class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvSender, tvContent;
        
        ViewHolder(View itemView) {
            super(itemView);
            tvSender = itemView.findViewById(R.id.tvSender);
            tvContent = itemView.findViewById(R.id.tvContent);
        }
    }
}`,
    principles: [
      "Observer Pattern - כל המאזינים מקבלים עדכון כשהנתונים משתנים",
      "Push Architecture - Firebase דוחף עדכונים לקליינטים",
      "ValueEventListener - מקבל את כל הנתונים בכל שינוי",
      "ChildEventListener - מקבל רק את השינוי הספציפי (יעיל יותר)"
    ],
    tips: [
      "השתמש ב-ChildEventListener לרשימות גדולות - יעיל יותר",
      "תמיד בטל listeners ב-onDestroy למניעת דליפות זיכרון",
      "הוסף אינדקס ל-Firebase Console לשיפור ביצועי השאילתות",
      "שקול להגביל את כמות ההודעות עם limitToLast()"
    ]
  },
  {
    id: "gemini-text",
    name: "Gemini API - פרומפט טקסטואלי",
    nameEn: "Gemini API - Text Prompt",
    category: "advanced",
    points: 10,
    description: "שימוש ב-Gemini API של Google לקבלת תשובות טקסטואליות מבוססות AI.",
    theory: `Gemini הוא מודל ה-AI המתקדם של Google, המאפשר יצירת תוכן טקסטואלי חכם.

עקרונות מרכזיים:
• API מבוסס REST - שליחת בקשות HTTP לשרתי Google
• Prompt Engineering - ניסוח נכון של השאלה משפיע על איכות התשובה
• Async Operation - העבודה חייבת להיות אסינכרונית
• API Key - נדרש מפתח אישי מ-Google AI Studio

תהליך העבודה:
1. קבלת API Key מ-Google AI Studio
2. בניית בקשת HTTP עם ה-prompt
3. שליחה אסינכרונית לשרת
4. פענוח תשובת JSON
5. הצגת התוכן למשתמש

שיקולים חשובים:
• Rate Limits - הגבלות על כמות הבקשות
• Token Limits - הגבלה על אורך הטקסט
• עלויות - חלק מהשימושים בתשלום`,
    codeExample: `// ========================================
// מחלקת עזר לתקשורת עם Gemini API
// ========================================
public class GeminiApiHelper {
    private static final String API_URL = 
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    private String apiKey;
    
    public GeminiApiHelper(String apiKey) {
        this.apiKey = apiKey;
    }
    
    // ממשק callback לקבלת תשובה
    public interface GeminiCallback {
        void onSuccess(String response);
        void onError(String error);
    }
    
    // שליחת prompt טקסטואלי
    public void sendTextPrompt(String prompt, GeminiCallback callback) {
        new Thread(() -> {
            try {
                // בניית URL עם API Key
                URL url = new URL(API_URL + "?key=" + apiKey);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                conn.setConnectTimeout(30000);
                conn.setReadTimeout(30000);
                
                // בניית גוף הבקשה בפורמט JSON
                JSONObject requestBody = new JSONObject();
                JSONArray contents = new JSONArray();
                JSONObject content = new JSONObject();
                JSONArray parts = new JSONArray();
                JSONObject part = new JSONObject();
                
                part.put("text", prompt);
                parts.put(part);
                content.put("parts", parts);
                contents.put(content);
                requestBody.put("contents", contents);
                
                // שליחת הבקשה
                OutputStream os = conn.getOutputStream();
                os.write(requestBody.toString().getBytes("UTF-8"));
                os.close();
                
                // קריאת התשובה
                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(
                        new InputStreamReader(conn.getInputStream())
                    );
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();
                    
                    // פענוח התשובה
                    String textResponse = parseGeminiResponse(response.toString());
                    callback.onSuccess(textResponse);
                } else {
                    // קריאת שגיאה
                    BufferedReader errorReader = new BufferedReader(
                        new InputStreamReader(conn.getErrorStream())
                    );
                    StringBuilder error = new StringBuilder();
                    String line;
                    while ((line = errorReader.readLine()) != null) {
                        error.append(line);
                    }
                    errorReader.close();
                    callback.onError("שגיאה " + responseCode + ": " + error.toString());
                }
                
            } catch (Exception e) {
                callback.onError("שגיאה בתקשורת: " + e.getMessage());
            }
        }).start();
    }
    
    // פענוח תשובת JSON מ-Gemini
    private String parseGeminiResponse(String jsonResponse) throws JSONException {
        JSONObject response = new JSONObject(jsonResponse);
        JSONArray candidates = response.getJSONArray("candidates");
        if (candidates.length() > 0) {
            JSONObject candidate = candidates.getJSONObject(0);
            JSONObject content = candidate.getJSONObject("content");
            JSONArray parts = content.getJSONArray("parts");
            if (parts.length() > 0) {
                return parts.getJSONObject(0).getString("text");
            }
        }
        return "לא התקבלה תשובה";
    }
}

// ========================================
// שימוש ב-Activity
// ========================================
public class GeminiTextActivity extends AppCompatActivity {
    private EditText etPrompt;
    private TextView tvResponse;
    private Button btnSend;
    private ProgressBar progressBar;
    private GeminiApiHelper geminiHelper;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gemini_text);
        
        etPrompt = findViewById(R.id.etPrompt);
        tvResponse = findViewById(R.id.tvResponse);
        btnSend = findViewById(R.id.btnSend);
        progressBar = findViewById(R.id.progressBar);
        
        // אתחול עם API Key (בפרויקט אמיתי - לא לשמור בקוד!)
        geminiHelper = new GeminiApiHelper("YOUR_API_KEY");
        
        btnSend.setOnClickListener(v -> sendPrompt());
    }
    
    private void sendPrompt() {
        String prompt = etPrompt.getText().toString().trim();
        if (prompt.isEmpty()) {
            Toast.makeText(this, "אנא הכנס שאלה", Toast.LENGTH_SHORT).show();
            return;
        }
        
        // הצגת טעינה
        progressBar.setVisibility(View.VISIBLE);
        btnSend.setEnabled(false);
        tvResponse.setText("ממתין לתשובה...");
        
        geminiHelper.sendTextPrompt(prompt, new GeminiApiHelper.GeminiCallback() {
            @Override
            public void onSuccess(String response) {
                // חזרה ל-Main Thread לעדכון UI
                runOnUiThread(() -> {
                    progressBar.setVisibility(View.GONE);
                    btnSend.setEnabled(true);
                    tvResponse.setText(response);
                });
            }
            
            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    progressBar.setVisibility(View.GONE);
                    btnSend.setEnabled(true);
                    tvResponse.setText("שגיאה: " + error);
                    Toast.makeText(GeminiTextActivity.this, error, Toast.LENGTH_LONG).show();
                });
            }
        });
    }
}`,
    principles: [
      "Async/Await Pattern - תקשורת רשת חייבת להיות אסינכרונית",
      "Callback Pattern - קבלת תשובה דרך ממשק callback",
      "Error Handling - טיפול מלא בשגיאות רשת ו-API",
      "UI Thread Safety - עדכון UI רק מה-Main Thread עם runOnUiThread"
    ],
    tips: [
      "אל תשמור API Key בקוד - השתמש ב-BuildConfig או SharedPreferences מוצפן",
      "הוסף timeout סביר לבקשות (30 שניות)",
      "הצג למשתמש מחוון טעינה בזמן המתנה לתשובה",
      "שמור היסטוריית שיחות אם רוצים צ'אט מתמשך"
    ]
  },
  {
    id: "gemini-image-input",
    name: "Gemini API - פרומפט עם תמונה",
    nameEn: "Gemini API - Image Input",
    category: "advanced",
    points: 10,
    description: "שליחת תמונה ל-Gemini API לניתוח, זיהוי ותיאור התמונה.",
    theory: `Gemini Vision מאפשר לשלוח תמונות יחד עם prompt טקסטואלי לניתוח.

עקרונות מרכזיים:
• Multimodal Input - שילוב טקסט ותמונה בבקשה אחת
• Base64 Encoding - התמונה נשלחת מקודדת ב-Base64
• Image Analysis - המודל יכול לתאר, לנתח ולענות שאלות על תמונות

שימושים נפוצים:
• תיאור תמונות (Image Captioning)
• זיהוי אובייקטים
• OCR - קריאת טקסט מתמונה
• ניתוח רגשות בתמונה
• מענה על שאלות לגבי תוכן התמונה

מודל מומלץ: gemini-pro-vision

מגבלות:
• גודל מקסימלי לתמונה
• פורמטים נתמכים: JPEG, PNG, WEBP, GIF`,
    codeExample: `// ========================================
// Gemini Vision - ניתוח תמונות
// ========================================
public class GeminiVisionHelper {
    private static final String API_URL = 
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";
    private String apiKey;
    
    public GeminiVisionHelper(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public interface VisionCallback {
        void onSuccess(String analysis);
        void onError(String error);
    }
    
    // שליחת תמונה עם prompt לניתוח
    public void analyzeImage(Bitmap image, String prompt, VisionCallback callback) {
        new Thread(() -> {
            try {
                // המרת התמונה ל-Base64
                String base64Image = bitmapToBase64(image);
                
                // בניית הבקשה
                URL url = new URL(API_URL + "?key=" + apiKey);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                conn.setConnectTimeout(60000); // timeout ארוך יותר לתמונות
                conn.setReadTimeout(60000);
                
                // בניית גוף הבקשה עם תמונה וטקסט
                JSONObject requestBody = buildVisionRequest(base64Image, prompt);
                
                // שליחה
                OutputStream os = conn.getOutputStream();
                os.write(requestBody.toString().getBytes("UTF-8"));
                os.close();
                
                // קבלת תשובה
                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    String response = readResponse(conn.getInputStream());
                    String analysis = parseGeminiResponse(response);
                    callback.onSuccess(analysis);
                } else {
                    String error = readResponse(conn.getErrorStream());
                    callback.onError("שגיאה " + responseCode + ": " + error);
                }
                
            } catch (Exception e) {
                callback.onError("שגיאה: " + e.getMessage());
            }
        }).start();
    }
    
    // המרת Bitmap ל-Base64
    private String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        
        // כיווץ התמונה אם גדולה מדי
        int maxSize = 1024;
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        
        if (width > maxSize || height > maxSize) {
            float scale = Math.min((float) maxSize / width, (float) maxSize / height);
            int newWidth = Math.round(width * scale);
            int newHeight = Math.round(height * scale);
            bitmap = Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true);
        }
        
        bitmap.compress(Bitmap.CompressFormat.JPEG, 85, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.NO_WRAP);
    }
    
    // בניית בקשה עם תמונה וטקסט
    private JSONObject buildVisionRequest(String base64Image, String prompt) throws JSONException {
        JSONObject requestBody = new JSONObject();
        JSONArray contents = new JSONArray();
        JSONObject content = new JSONObject();
        JSONArray parts = new JSONArray();
        
        // חלק טקסטואלי
        JSONObject textPart = new JSONObject();
        textPart.put("text", prompt);
        parts.put(textPart);
        
        // חלק התמונה
        JSONObject imagePart = new JSONObject();
        JSONObject inlineData = new JSONObject();
        inlineData.put("mime_type", "image/jpeg");
        inlineData.put("data", base64Image);
        imagePart.put("inline_data", inlineData);
        parts.put(imagePart);
        
        content.put("parts", parts);
        contents.put(content);
        requestBody.put("contents", contents);
        
        return requestBody;
    }
    
    private String readResponse(InputStream stream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        return response.toString();
    }
    
    private String parseGeminiResponse(String jsonResponse) throws JSONException {
        JSONObject response = new JSONObject(jsonResponse);
        JSONArray candidates = response.getJSONArray("candidates");
        if (candidates.length() > 0) {
            return candidates.getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .getString("text");
        }
        return "לא התקבל ניתוח";
    }
}

// ========================================
// Activity לניתוח תמונות
// ========================================
public class ImageAnalysisActivity extends AppCompatActivity {
    private ImageView ivImage;
    private EditText etPrompt;
    private TextView tvResult;
    private Button btnCapture, btnGallery, btnAnalyze;
    private Bitmap currentImage;
    private GeminiVisionHelper visionHelper;
    
    private ActivityResultLauncher<Intent> galleryLauncher = 
        registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    try {
                        Uri imageUri = result.getData().getData();
                        currentImage = MediaStore.Images.Media.getBitmap(
                            getContentResolver(), imageUri
                        );
                        ivImage.setImageBitmap(currentImage);
                    } catch (IOException e) {
                        Toast.makeText(this, "שגיאה בטעינת התמונה", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        );
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_analysis);
        
        ivImage = findViewById(R.id.ivImage);
        etPrompt = findViewById(R.id.etPrompt);
        tvResult = findViewById(R.id.tvResult);
        btnGallery = findViewById(R.id.btnGallery);
        btnAnalyze = findViewById(R.id.btnAnalyze);
        
        visionHelper = new GeminiVisionHelper("YOUR_API_KEY");
        
        btnGallery.setOnClickListener(v -> openGallery());
        btnAnalyze.setOnClickListener(v -> analyzeImage());
        
        // prompt ברירת מחדל
        etPrompt.setText("תאר את התמונה הזו בעברית");
    }
    
    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, 
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        galleryLauncher.launch(intent);
    }
    
    private void analyzeImage() {
        if (currentImage == null) {
            Toast.makeText(this, "אנא בחר תמונה תחילה", Toast.LENGTH_SHORT).show();
            return;
        }
        
        String prompt = etPrompt.getText().toString().trim();
        if (prompt.isEmpty()) {
            prompt = "תאר את התמונה";
        }
        
        tvResult.setText("מנתח תמונה...");
        btnAnalyze.setEnabled(false);
        
        visionHelper.analyzeImage(currentImage, prompt, new GeminiVisionHelper.VisionCallback() {
            @Override
            public void onSuccess(String analysis) {
                runOnUiThread(() -> {
                    tvResult.setText(analysis);
                    btnAnalyze.setEnabled(true);
                });
            }
            
            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    tvResult.setText("שגיאה: " + error);
                    btnAnalyze.setEnabled(true);
                });
            }
        });
    }
}`,
    principles: [
      "Multimodal Processing - עיבוד משולב של טקסט ותמונה",
      "Base64 Encoding - קידוד בינארי לטקסט להעברה ב-JSON",
      "Image Preprocessing - כיווץ וייעול התמונה לפני שליחה",
      "Callback Pattern - טיפול אסינכרוני בתשובה"
    ],
    tips: [
      "כווץ תמונות גדולות לפני שליחה לחיסכון ב-bandwidth",
      "השתמש ב-prompt ספציפי לקבלת תשובות ממוקדות",
      "טפל במקרים של תמונות לא ברורות או לא מתאימות",
      "הוסף אפשרות לצלם תמונה חדשה בנוסף לבחירה מגלריה"
    ]
  },
  {
    id: "gemini-multimodal",
    name: "Gemini API - דו-מודאלי (טקסט+תמונה → תמונה)",
    nameEn: "Gemini API - Multimodal Image Generation",
    category: "advanced",
    points: 10,
    description: "שימוש ב-Gemini API עם קלט של טקסט ותמונה ליצירת תמונה חדשה או עריכה של תמונה קיימת.",
    theory: `Gemini Multimodal מאפשר עיבוד מתקדם שכולל קלט של טקסט ותמונה ופלט של תמונה חדשה.

עקרונות מרכזיים:
• Image-to-Image - שינוי/עריכה של תמונה קיימת
• Text-Guided Generation - הטקסט מכוון את השינויים בתמונה
• Dual Encoding - קידוד הן של הטקסט והן של התמונה

שימושים נפוצים:
• עריכת תמונות לפי הוראות טקסטואליות
• הוספת אלמנטים לתמונה קיימת
• שינוי סגנון של תמונה
• יצירת וריאציות של תמונה

מודל: gemini-2.0-flash-exp (תומך ביצירת תמונות)

הבדל מ-Vision:
• Vision - קלט תמונה, פלט טקסט (ניתוח)
• Multimodal - קלט תמונה+טקסט, פלט תמונה (יצירה)`,
    codeExample: `// ========================================
// Gemini Multimodal - יצירת תמונות
// ========================================
public class GeminiImageGenerator {
    private static final String API_URL = 
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
    private String apiKey;
    
    public GeminiImageGenerator(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public interface ImageGenerationCallback {
        void onImageGenerated(Bitmap image);
        void onTextResponse(String text);
        void onError(String error);
    }
    
    // יצירת/עריכת תמונה עם קלט תמונה וטקסט
    public void generateImage(Bitmap inputImage, String prompt, ImageGenerationCallback callback) {
        new Thread(() -> {
            try {
                String base64Image = bitmapToBase64(inputImage);
                
                URL url = new URL(API_URL + "?key=" + apiKey);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                conn.setConnectTimeout(120000); // timeout ארוך ליצירת תמונות
                conn.setReadTimeout(120000);
                
                // בניית בקשה עם הגדרות ליצירת תמונה
                JSONObject requestBody = buildImageGenerationRequest(base64Image, prompt);
                
                OutputStream os = conn.getOutputStream();
                os.write(requestBody.toString().getBytes("UTF-8"));
                os.close();
                
                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    String response = readResponse(conn.getInputStream());
                    parseImageResponse(response, callback);
                } else {
                    String error = readResponse(conn.getErrorStream());
                    callback.onError("שגיאה " + responseCode + ": " + error);
                }
                
            } catch (Exception e) {
                callback.onError("שגיאה: " + e.getMessage());
            }
        }).start();
    }
    
    // יצירת תמונה מטקסט בלבד
    public void generateFromText(String prompt, ImageGenerationCallback callback) {
        new Thread(() -> {
            try {
                URL url = new URL(API_URL + "?key=" + apiKey);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                conn.setConnectTimeout(120000);
                conn.setReadTimeout(120000);
                
                JSONObject requestBody = buildTextToImageRequest(prompt);
                
                OutputStream os = conn.getOutputStream();
                os.write(requestBody.toString().getBytes("UTF-8"));
                os.close();
                
                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    String response = readResponse(conn.getInputStream());
                    parseImageResponse(response, callback);
                } else {
                    String error = readResponse(conn.getErrorStream());
                    callback.onError("שגיאה " + responseCode + ": " + error);
                }
                
            } catch (Exception e) {
                callback.onError("שגיאה: " + e.getMessage());
            }
        }).start();
    }
    
    // בניית בקשה ליצירת תמונה מתמונה וטקסט
    private JSONObject buildImageGenerationRequest(String base64Image, String prompt) 
            throws JSONException {
        JSONObject requestBody = new JSONObject();
        JSONArray contents = new JSONArray();
        JSONObject content = new JSONObject();
        JSONArray parts = new JSONArray();
        
        // הוראה ליצירת תמונה
        JSONObject textPart = new JSONObject();
        textPart.put("text", prompt + "\\n\\nPlease generate an image based on this.");
        parts.put(textPart);
        
        // התמונה הקיימת כבסיס
        JSONObject imagePart = new JSONObject();
        JSONObject inlineData = new JSONObject();
        inlineData.put("mime_type", "image/jpeg");
        inlineData.put("data", base64Image);
        imagePart.put("inline_data", inlineData);
        parts.put(imagePart);
        
        content.put("parts", parts);
        contents.put(content);
        requestBody.put("contents", contents);
        
        // הגדרות ליצירת תמונה
        JSONObject generationConfig = new JSONObject();
        generationConfig.put("response_modalities", new JSONArray().put("TEXT").put("IMAGE"));
        requestBody.put("generationConfig", generationConfig);
        
        return requestBody;
    }
    
    // בניית בקשה ליצירת תמונה מטקסט בלבד
    private JSONObject buildTextToImageRequest(String prompt) throws JSONException {
        JSONObject requestBody = new JSONObject();
        JSONArray contents = new JSONArray();
        JSONObject content = new JSONObject();
        JSONArray parts = new JSONArray();
        
        JSONObject textPart = new JSONObject();
        textPart.put("text", prompt);
        parts.put(textPart);
        
        content.put("parts", parts);
        contents.put(content);
        requestBody.put("contents", contents);
        
        // הגדרות ליצירת תמונה
        JSONObject generationConfig = new JSONObject();
        generationConfig.put("response_modalities", new JSONArray().put("TEXT").put("IMAGE"));
        requestBody.put("generationConfig", generationConfig);
        
        return requestBody;
    }
    
    // פענוח תשובה שיכולה לכלול טקסט ו/או תמונה
    private void parseImageResponse(String jsonResponse, ImageGenerationCallback callback) 
            throws JSONException {
        JSONObject response = new JSONObject(jsonResponse);
        JSONArray candidates = response.getJSONArray("candidates");
        
        if (candidates.length() > 0) {
            JSONObject candidate = candidates.getJSONObject(0);
            JSONObject content = candidate.getJSONObject("content");
            JSONArray parts = content.getJSONArray("parts");
            
            for (int i = 0; i < parts.length(); i++) {
                JSONObject part = parts.getJSONObject(i);
                
                // בדיקה אם זה טקסט
                if (part.has("text")) {
                    callback.onTextResponse(part.getString("text"));
                }
                
                // בדיקה אם זו תמונה
                if (part.has("inline_data")) {
                    JSONObject inlineData = part.getJSONObject("inline_data");
                    String base64Data = inlineData.getString("data");
                    Bitmap bitmap = base64ToBitmap(base64Data);
                    callback.onImageGenerated(bitmap);
                }
            }
        } else {
            callback.onError("לא התקבלה תשובה מהמודל");
        }
    }
    
    private String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        
        // כיווץ אם צריך
        int maxSize = 1024;
        if (bitmap.getWidth() > maxSize || bitmap.getHeight() > maxSize) {
            float scale = Math.min(
                (float) maxSize / bitmap.getWidth(), 
                (float) maxSize / bitmap.getHeight()
            );
            bitmap = Bitmap.createScaledBitmap(
                bitmap, 
                (int)(bitmap.getWidth() * scale), 
                (int)(bitmap.getHeight() * scale), 
                true
            );
        }
        
        bitmap.compress(Bitmap.CompressFormat.JPEG, 85, stream);
        return Base64.encodeToString(stream.toByteArray(), Base64.NO_WRAP);
    }
    
    private Bitmap base64ToBitmap(String base64String) {
        byte[] decodedBytes = Base64.decode(base64String, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    }
    
    private String readResponse(InputStream stream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        return response.toString();
    }
}

// ========================================
// Activity ליצירת תמונות
// ========================================
public class ImageGenerationActivity extends AppCompatActivity {
    private ImageView ivInput, ivOutput;
    private EditText etPrompt;
    private Button btnSelectImage, btnGenerate, btnGenerateFromText;
    private ProgressBar progressBar;
    private Bitmap inputImage;
    private GeminiImageGenerator generator;
    
    private ActivityResultLauncher<Intent> galleryLauncher = 
        registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    try {
                        Uri uri = result.getData().getData();
                        inputImage = MediaStore.Images.Media.getBitmap(
                            getContentResolver(), uri
                        );
                        ivInput.setImageBitmap(inputImage);
                        ivInput.setVisibility(View.VISIBLE);
                    } catch (IOException e) {
                        showError("שגיאה בטעינת התמונה");
                    }
                }
            }
        );
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_generation);
        
        ivInput = findViewById(R.id.ivInput);
        ivOutput = findViewById(R.id.ivOutput);
        etPrompt = findViewById(R.id.etPrompt);
        btnSelectImage = findViewById(R.id.btnSelectImage);
        btnGenerate = findViewById(R.id.btnGenerate);
        btnGenerateFromText = findViewById(R.id.btnGenerateFromText);
        progressBar = findViewById(R.id.progressBar);
        
        generator = new GeminiImageGenerator("YOUR_API_KEY");
        
        btnSelectImage.setOnClickListener(v -> openGallery());
        btnGenerate.setOnClickListener(v -> generateWithImage());
        btnGenerateFromText.setOnClickListener(v -> generateFromTextOnly());
    }
    
    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK,
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        galleryLauncher.launch(intent);
    }
    
    private void generateWithImage() {
        if (inputImage == null) {
            showError("אנא בחר תמונה תחילה");
            return;
        }
        
        String prompt = etPrompt.getText().toString().trim();
        if (prompt.isEmpty()) {
            showError("אנא הכנס הוראות לעריכת התמונה");
            return;
        }
        
        startGeneration();
        
        generator.generateImage(inputImage, prompt, new GeminiImageGenerator.ImageGenerationCallback() {
            @Override
            public void onImageGenerated(Bitmap image) {
                runOnUiThread(() -> {
                    ivOutput.setImageBitmap(image);
                    ivOutput.setVisibility(View.VISIBLE);
                    endGeneration();
                });
            }
            
            @Override
            public void onTextResponse(String text) {
                runOnUiThread(() -> {
                    Toast.makeText(ImageGenerationActivity.this, text, Toast.LENGTH_LONG).show();
                });
            }
            
            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    showError(error);
                    endGeneration();
                });
            }
        });
    }
    
    private void generateFromTextOnly() {
        String prompt = etPrompt.getText().toString().trim();
        if (prompt.isEmpty()) {
            showError("אנא הכנס תיאור לתמונה שברצונך ליצור");
            return;
        }
        
        startGeneration();
        
        generator.generateFromText(prompt, new GeminiImageGenerator.ImageGenerationCallback() {
            @Override
            public void onImageGenerated(Bitmap image) {
                runOnUiThread(() -> {
                    ivOutput.setImageBitmap(image);
                    ivOutput.setVisibility(View.VISIBLE);
                    endGeneration();
                });
            }
            
            @Override
            public void onTextResponse(String text) {
                runOnUiThread(() -> {
                    Toast.makeText(ImageGenerationActivity.this, text, Toast.LENGTH_LONG).show();
                });
            }
            
            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    showError(error);
                    endGeneration();
                });
            }
        });
    }
    
    private void startGeneration() {
        progressBar.setVisibility(View.VISIBLE);
        btnGenerate.setEnabled(false);
        btnGenerateFromText.setEnabled(false);
    }
    
    private void endGeneration() {
        progressBar.setVisibility(View.GONE);
        btnGenerate.setEnabled(true);
        btnGenerateFromText.setEnabled(true);
    }
    
    private void showError(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }
}`,
    principles: [
      "Multimodal I/O - קלט ופלט משולבים של מדיה שונות",
      "Response Modalities - הגדרת סוגי הפלט הרצויים",
      "Base64 Encoding/Decoding - המרה דו-כיוונית בין Bitmap לטקסט",
      "Flexible Output Handling - טיפול בתשובות שיכולות לכלול טקסט, תמונה או שניהם"
    ],
    tips: [
      "השתמש ב-timeout ארוך (120 שניות+) כי יצירת תמונות לוקחת זמן",
      "הצג למשתמש מחוון טעינה ברור בזמן היצירה",
      "הוסף אפשרות לשמור את התמונה שנוצרה לגלריה",
      "נסה prompts שונים לקבלת תוצאות מגוונות"
    ]
  },
  {
    id: "singleton",
    name: "Singleton",
    nameEn: "Singleton Design Pattern",
    category: "combined",
    points: 1,
    description: "תבנית עיצוב המבטיחה שיהיה רק מופע אחד של מחלקה בכל האפליקציה.",
    theory: `Singleton הוא Design Pattern שמבטיח שתהיה רק מופע (instance) אחד של מחלקה.

העיקרון המרכזי: שליטה בכמות המופעים של מחלקה - מאפשר גישה גלובלית לאובייקט יחיד.

מתי להשתמש:
• ניהול חיבור למסד נתונים
• ניהול הגדרות (Settings/Preferences)
• מנהל משתמש מחובר (UserManager)
• Cache מרכזי
• Logger

יתרונות:
• גישה גלובלית מכל מקום באפליקציה
• חיסכון בזיכרון - אובייקט אחד בלבד
• שליטה מרכזית במשאב משותף

חסרונות ושיקולים:
• קושי בבדיקות (Testing)
• תלות גלובלית - יכול להקשות על תחזוקה
• Thread Safety - צריך לוודא שעובד נכון עם מספר threads

מימוש באנדרואיד:
• Eager Initialization - יצירה מיידית
• Lazy Initialization - יצירה רק בשימוש ראשון
• Thread-Safe Singleton - בטוח לריבוי threads`,
    codeExample: `// ========================================
// דוגמה 1: Singleton פשוט
// ========================================
public class UserManager {
    // משתנה סטטי לשמירת המופע היחיד
    private static UserManager instance;
    
    // המשתמש המחובר
    private User currentUser;
    
    // פעולה בונה פרטית - מונעת יצירת מופעים מבחוץ!
    private UserManager() {
        currentUser = null;
    }
    
    // פעולה סטטית לקבלת המופע היחיד
    public static UserManager getInstance() {
        if (instance == null) {
            instance = new UserManager();
        }
        return instance;
    }
    
    // פעולות לניהול המשתמש
    public void login(User user) {
        this.currentUser = user;
    }
    
    public void logout() {
        this.currentUser = null;
    }
    
    public User getCurrentUser() {
        return currentUser;
    }
    
    public boolean isLoggedIn() {
        return currentUser != null;
    }
}

// ========================================
// שימוש מכל מקום באפליקציה
// ========================================
// במסך התחברות:
UserManager.getInstance().login(user);

// במסך הראשי:
if (UserManager.getInstance().isLoggedIn()) {
    User user = UserManager.getInstance().getCurrentUser();
    tvWelcome.setText("שלום " + user.getName());
}

// במסך הגדרות:
UserManager.getInstance().logout();

// ========================================
// דוגמה 2: Singleton Thread-Safe
// ========================================
public class DatabaseManager {
    // volatile מבטיח שכל ה-threads רואים את אותו ערך
    private static volatile DatabaseManager instance;
    private SQLiteDatabase database;
    
    private DatabaseManager(Context context) {
        DBHelper helper = new DBHelper(context.getApplicationContext());
        database = helper.getWritableDatabase();
    }
    
    // Double-Checked Locking - בטוח ויעיל
    public static DatabaseManager getInstance(Context context) {
        if (instance == null) {
            synchronized (DatabaseManager.class) {
                if (instance == null) {
                    instance = new DatabaseManager(context);
                }
            }
        }
        return instance;
    }
    
    public SQLiteDatabase getDatabase() {
        return database;
    }
    
    public void closeDatabase() {
        if (database != null && database.isOpen()) {
            database.close();
        }
    }
}

// ========================================
// דוגמה 3: Singleton להגדרות
// ========================================
public class SettingsManager {
    private static SettingsManager instance;
    private SharedPreferences prefs;
    
    private static final String PREF_NAME = "app_settings";
    private static final String KEY_DARK_MODE = "dark_mode";
    private static final String KEY_LANGUAGE = "language";
    private static final String KEY_NOTIFICATIONS = "notifications";
    
    private SettingsManager(Context context) {
        prefs = context.getApplicationContext()
            .getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
    }
    
    public static synchronized SettingsManager getInstance(Context context) {
        if (instance == null) {
            instance = new SettingsManager(context);
        }
        return instance;
    }
    
    // Dark Mode
    public boolean isDarkMode() {
        return prefs.getBoolean(KEY_DARK_MODE, false);
    }
    
    public void setDarkMode(boolean enabled) {
        prefs.edit().putBoolean(KEY_DARK_MODE, enabled).apply();
    }
    
    // Language
    public String getLanguage() {
        return prefs.getString(KEY_LANGUAGE, "he");
    }
    
    public void setLanguage(String language) {
        prefs.edit().putString(KEY_LANGUAGE, language).apply();
    }
    
    // Notifications
    public boolean areNotificationsEnabled() {
        return prefs.getBoolean(KEY_NOTIFICATIONS, true);
    }
    
    public void setNotificationsEnabled(boolean enabled) {
        prefs.edit().putBoolean(KEY_NOTIFICATIONS, enabled).apply();
    }
}

// שימוש:
SettingsManager settings = SettingsManager.getInstance(this);
if (settings.isDarkMode()) {
    // החל מצב כהה
}`,
    principles: [
      "Private Constructor - מניעת יצירת מופעים מבחוץ",
      "Static Instance - משתנה סטטי לשמירת המופע היחיד",
      "Global Access Point - מתודה סטטית לגישה למופע",
      "Thread Safety - הגנה מפני בעיות ריבוי threads"
    ],
    tips: [
      "השתמש ב-Singleton רק כשבאמת צריך מופע יחיד",
      "העדף Dependency Injection על פני Singleton כשאפשר",
      "זכור להשתמש ב-synchronized או volatile למימוש Thread-Safe",
      "שמור Context של Application, לא של Activity (למניעת דליפות זיכרון)"
    ]
  }
];

export const getExtensionsByCategory = (category: Extension["category"]) => {
  return extensions.filter(ext => ext.category === category);
};

export const getExtensionById = (id: string) => {
  return extensions.find(ext => ext.id === id);
};
