// רכיבים משדרגים - לא נחשבים להרחבות אבל משדרגים את האפליקציה
export interface Component {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  theory: string;
  codeExample: string;
  principles: string[];
  tips: string[];
}

export const components: Component[] = [
  {
    id: "recyclerview",
    name: "RecyclerView",
    nameEn: "RecyclerView",
    description: "רכיב מתקדם להצגת רשימות גדולות עם ביצועים גבוהים ומחזור אלמנטים.",
    theory: `RecyclerView הוא רכיב מתקדם להצגת רשימות נתונים גדולות ביעילות.

העיקרון המרכזי: מחזור (Recycling) של אלמנטים - במקום ליצור View חדש לכל פריט, 
RecyclerView משתמש שוב באלמנטים שיצאו מהמסך.

יתרונות על ListView:
• ביצועים טובים יותר ברשימות גדולות
• גמישות בפריסה (אנכי, אופקי, Grid)
• אנימציות מובנות
• תמיכה בהוספה/הסרה של פריטים

רכיבים עיקריים:
• RecyclerView - הרכיב הראשי
• Adapter - מחבר בין הנתונים לתצוגה
• ViewHolder - מחזיק את ה-Views של כל פריט
• LayoutManager - קובע את סידור הפריטים

תבנית ViewHolder:
• מונע קריאות יקרות ל-findViewById
• שומר הפניות ל-Views בזיכרון
• משפר ביצועים בגלילה`,
    codeExample: `// ========================================
// מחלקת העצם
// ========================================
public class Product {
    private int id;
    private String name;
    private double price;
    private String imageUrl;
    
    public Product(int id, String name, double price, String imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    
    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
}

// ========================================
// ViewHolder - מחזיק את ה-Views
// ========================================
public class ProductViewHolder extends RecyclerView.ViewHolder {
    ImageView ivProduct;
    TextView tvName;
    TextView tvPrice;
    Button btnAddToCart;
    
    public ProductViewHolder(@NonNull View itemView) {
        super(itemView);
        // מציאת ה-Views פעם אחת בלבד!
        ivProduct = itemView.findViewById(R.id.ivProduct);
        tvName = itemView.findViewById(R.id.tvName);
        tvPrice = itemView.findViewById(R.id.tvPrice);
        btnAddToCart = itemView.findViewById(R.id.btnAddToCart);
    }
    
    // מתודה לאכלוס הנתונים ב-Views
    public void bind(Product product, OnProductClickListener listener) {
        tvName.setText(product.getName());
        tvPrice.setText(String.format("₪%.2f", product.getPrice()));
        
        // הגדרת listener ללחיצה
        btnAddToCart.setOnClickListener(v -> {
            if (listener != null) {
                listener.onAddToCart(product);
            }
        });
        
        itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onProductClick(product);
            }
        });
    }
}

// ========================================
// Adapter - מחבר בין נתונים לתצוגה
// ========================================
public class ProductAdapter extends RecyclerView.Adapter<ProductViewHolder> {
    private ArrayList<Product> products;
    private OnProductClickListener listener;
    
    // ממשק לטיפול באירועים
    public interface OnProductClickListener {
        void onProductClick(Product product);
        void onAddToCart(Product product);
    }
    
    public ProductAdapter(ArrayList<Product> products, OnProductClickListener listener) {
        this.products = products;
        this.listener = listener;
    }
    
    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_product, parent, false);
        return new ProductViewHolder(view);
    }
    
    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product product = products.get(position);
        holder.bind(product, listener);
    }
    
    @Override
    public int getItemCount() {
        return products.size();
    }
    
    // מתודות לעדכון הרשימה
    public void addProduct(Product product) {
        products.add(product);
        notifyItemInserted(products.size() - 1);
    }
    
    public void removeProduct(int position) {
        products.remove(position);
        notifyItemRemoved(position);
    }
}

// ========================================
// שימוש ב-Activity
// ========================================
public class ProductListActivity extends AppCompatActivity 
        implements ProductAdapter.OnProductClickListener {
    
    private RecyclerView recyclerView;
    private ProductAdapter adapter;
    private ArrayList<Product> products;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);
        
        recyclerView = findViewById(R.id.recyclerView);
        
        // הגדרת LayoutManager - סידור אנכי
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        
        // אפשרויות נוספות:
        // Grid בשתי עמודות:
        // recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
        
        // טעינת נתונים
        products = loadProducts();
        
        // יצירת Adapter וחיבור
        adapter = new ProductAdapter(products, this);
        recyclerView.setAdapter(adapter);
    }
    
    private ArrayList<Product> loadProducts() {
        ArrayList<Product> list = new ArrayList<>();
        list.add(new Product(1, "טלפון", 2999.99, "url1"));
        list.add(new Product(2, "אוזניות", 299.99, "url2"));
        return list;
    }
    
    @Override
    public void onProductClick(Product product) {
        Intent intent = new Intent(this, ProductDetailsActivity.class);
        intent.putExtra("product_id", product.getId());
        startActivity(intent);
    }
    
    @Override
    public void onAddToCart(Product product) {
        Toast.makeText(this, 
            product.getName() + " נוסף לסל", 
            Toast.LENGTH_SHORT).show();
    }
}`,
    principles: [
      "ViewHolder Pattern - מניעת קריאות יקרות ל-findViewById",
      "Adapter Pattern - הפרדה בין הנתונים לתצוגה",
      "Recycling - שימוש חוזר ב-Views לחיסכון בזיכרון",
      "LayoutManager - גמישות בסידור הפריטים"
    ],
    tips: [
      "השתמש ב-notifyItemInserted/Removed במקום notifyDataSetChanged לביצועים טובים",
      "הימנע מעבודה כבדה ב-onBindViewHolder",
      "השתמש ב-DiffUtil לעדכון יעיל של רשימות גדולות",
      "הוסף ItemDecoration לרווחים בין פריטים"
    ]
  },
  {
    id: "cardview",
    name: "CardView",
    nameEn: "CardView",
    description: "רכיב להצגת תוכן בכרטיסיות עם צל ופינות מעוגלות.",
    theory: `CardView הוא רכיב UI שמספק מראה עקבי לכרטיסיות באפליקציה.

מאפיינים עיקריים:
• פינות מעוגלות (corner radius)
• צל (elevation)
• תמיכה בתאימות לאחור

שימושים נפוצים:
• תצוגת פריטים ברשימות
• כרטיסי מידע
• תפריטים ואפשרויות`,
    codeExample: `<!-- XML Layout -->
<androidx.cardview.widget.CardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardCornerRadius="12dp"
    app:cardElevation="4dp"
    app:cardBackgroundColor="@color/white"
    android:layout_margin="8dp">
    
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">
        
        <TextView
            android:id="@+id/tvTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="כותרת"
            android:textSize="18sp"
            android:textStyle="bold" />
            
        <TextView
            android:id="@+id/tvDescription"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="תיאור הכרטיסייה"
            android:layout_marginTop="8dp" />
            
    </LinearLayout>
</androidx.cardview.widget.CardView>

<!-- build.gradle (dependencies) -->
implementation 'androidx.cardview:cardview:1.0.0'`,
    principles: [
      "Material Design - עקביות עיצובית",
      "Elevation - היררכיה ויזואלית עם צללים",
      "Backwards Compatibility - תמיכה בגרסאות ישנות"
    ],
    tips: [
      "השתמש ב-CardView בתוך RecyclerView לתצוגת רשימות יפה",
      "הימנע מ-elevation גבוה מדי - 4-8dp בדרך כלל מספיק",
      "השתמש ב-cardUseCompatPadding לתאימות לאחור"
    ]
  },
  {
    id: "constraintlayout",
    name: "ConstraintLayout",
    nameEn: "ConstraintLayout",
    description: "מערכת פריסה גמישה ויעילה לבניית ממשקים מורכבים.",
    theory: `ConstraintLayout הוא מנוע פריסה חזק שמאפשר ליצור ממשקים מורכבים עם היררכיה שטוחה.

יתרונות:
• ביצועים טובים - היררכיה שטוחה
• גמישות - אילוצים בין רכיבים
• תמיכה ב-Guidelines ו-Barriers
• תצוגת עיצוב ויזואלית ב-Android Studio

סוגי אילוצים:
• Relative Positioning - יחסית לרכיב אחר
• Margins - מרווחים
• Centering - מרכוז
• Chains - שרשראות לחלוקה שווה`,
    codeExample: `<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- כותרת במרכז למעלה -->
    <TextView
        android:id="@+id/tvTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="כותרת"
        android:textSize="24sp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="16dp" />

    <!-- תמונה מתחת לכותרת -->
    <ImageView
        android:id="@+id/ivImage"
        android:layout_width="200dp"
        android:layout_height="200dp"
        app:layout_constraintTop_toBottomOf="@id/tvTitle"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="24dp" />

    <!-- שני כפתורים בשרשרת אופקית -->
    <Button
        android:id="@+id/btnCancel"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="ביטול"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toStartOf="@id/btnConfirm"
        app:layout_constraintHorizontal_chainStyle="spread"
        android:layout_margin="16dp" />

    <Button
        android:id="@+id/btnConfirm"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="אישור"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toEndOf="@id/btnCancel"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_margin="16dp" />

    <!-- Guideline אנכי ב-30% -->
    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.3" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
    principles: [
      "Flat Hierarchy - היררכיה שטוחה לביצועים טובים",
      "Constraint System - מערכת אילוצים גמישה",
      "Responsive Design - תמיכה בגדלי מסך שונים",
      "Visual Editor - עריכה ויזואלית ב-IDE"
    ],
    tips: [
      "השתמש ב-0dp (match_constraint) במקום match_parent",
      "נצל Chains לחלוקה שווה בין רכיבים",
      "השתמש ב-Guidelines לעקביות בפריסה",
      "הימנע מקינון מיותר של ConstraintLayouts"
    ]
  },
  {
    id: "viewpager",
    name: "ViewPager2",
    nameEn: "ViewPager2",
    description: "רכיב להחלקה בין מסכים או תמונות עם תמיכה בטאבים.",
    theory: `ViewPager2 הוא רכיב להצגת תוכן בהחלקה (swipe).

שימושים נפוצים:
• מדריך התחלה (Onboarding)
• גלריית תמונות
• טאבים עם תוכן
• מסכים מרובים

יתרונות על ViewPager הישן:
• מבוסס על RecyclerView
• תמיכה בכיוון RTL
• החלקה אנכית ואופקית
• ביצועים משופרים`,
    codeExample: `// ========================================
// Adapter ל-ViewPager2 עם Fragments
// ========================================
public class OnboardingAdapter extends FragmentStateAdapter {
    
    public OnboardingAdapter(@NonNull FragmentActivity activity) {
        super(activity);
    }
    
    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position) {
            case 0:
                return OnboardingStepFragment.newInstance(
                    "ברוכים הבאים",
                    "האפליקציה שלנו תעזור לכם..."
                );
            case 1:
                return OnboardingStepFragment.newInstance(
                    "התחברו",
                    "היכנסו עם חשבון גוגל או אימייל"
                );
            case 2:
                return OnboardingStepFragment.newInstance(
                    "התחילו",
                    "הכל מוכן - בואו נתחיל!"
                );
            default:
                return null;
        }
    }
    
    @Override
    public int getItemCount() {
        return 3;
    }
}

// ========================================
// שימוש עם TabLayout
// ========================================
public class MainActivity extends AppCompatActivity {
    private ViewPager2 viewPager;
    private TabLayout tabLayout;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        viewPager = findViewById(R.id.viewPager);
        tabLayout = findViewById(R.id.tabLayout);
        
        // הגדרת Adapter
        viewPager.setAdapter(new OnboardingAdapter(this));
        
        // חיבור TabLayout ל-ViewPager2
        new TabLayoutMediator(tabLayout, viewPager,
            (tab, position) -> {
                switch (position) {
                    case 0: tab.setText("ברוכים הבאים"); break;
                    case 1: tab.setText("התחברות"); break;
                    case 2: tab.setText("התחלה"); break;
                }
            }
        ).attach();
    }
}

<!-- XML Layout -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tabLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
    
    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
        
</LinearLayout>`,
    principles: [
      "Adapter Pattern - הפרדה בין נתונים לתצוגה",
      "Fragment Lifecycle - ניהול נכון של Fragments",
      "TabLayoutMediator - סנכרון בין טאבים לתוכן",
      "RecyclerView Based - שימוש חוזר ב-Views"
    ],
    tips: [
      "השתמש ב-FragmentStateAdapter ל-Fragments",
      "הגדר setOffscreenPageLimit לשליטה בזיכרון",
      "השתמש ב-registerOnPageChangeCallback לאירועים",
      "שלב עם TabLayout לניווט קל"
    ]
  },
  {
    id: "bottomnavigation",
    name: "Bottom Navigation",
    nameEn: "Bottom Navigation",
    description: "סרגל ניווט תחתון למעבר בין מסכים ראשיים באפליקציה.",
    theory: `BottomNavigationView הוא רכיב ניווט תחתון לפי Material Design.

מתי להשתמש:
• 3-5 יעדים ראשיים
• צורך במעבר מהיר בין מסכים
• כל היעדים באותה רמת חשיבות

עקרונות עיצוב:
• מקסימום 5 פריטים
• אייקון + טקסט (אופציונלי)
• הדגשת הפריט הנבחר`,
    codeExample: `// ========================================
// Activity עם Bottom Navigation
// ========================================
public class MainActivity extends AppCompatActivity {
    private BottomNavigationView bottomNav;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        bottomNav = findViewById(R.id.bottomNav);
        
        // טיפול בלחיצות
        bottomNav.setOnItemSelectedListener(item -> {
            Fragment selectedFragment = null;
            
            int itemId = item.getItemId();
            if (itemId == R.id.nav_home) {
                selectedFragment = new HomeFragment();
            } else if (itemId == R.id.nav_search) {
                selectedFragment = new SearchFragment();
            } else if (itemId == R.id.nav_profile) {
                selectedFragment = new ProfileFragment();
            }
            
            if (selectedFragment != null) {
                getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, selectedFragment)
                    .commit();
            }
            
            return true;
        });
        
        // בחירת פריט ראשוני
        bottomNav.setSelectedItemId(R.id.nav_home);
    }
}

<!-- res/menu/bottom_nav_menu.xml -->
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_home"
        android:icon="@drawable/ic_home"
        android:title="בית" />
    <item
        android:id="@+id/nav_search"
        android:icon="@drawable/ic_search"
        android:title="חיפוש" />
    <item
        android:id="@+id/nav_profile"
        android:icon="@drawable/ic_person"
        android:title="פרופיל" />
</menu>

<!-- res/layout/activity_main.xml -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
    
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:menu="@menu/bottom_nav_menu" />
        
</LinearLayout>`,
    principles: [
      "Material Design - עקביות עם הנחיות גוגל",
      "Fragment Navigation - ניווט עם Fragments",
      "Menu Resource - הגדרת פריטים ב-XML",
      "State Preservation - שמירת מצב בניווט"
    ],
    tips: [
      "הגבל ל-3-5 פריטים בלבד",
      "השתמש באייקונים ברורים ומובנים",
      "שקול להשתמש ב-Navigation Component",
      "הוסף אנימציות למעברים חלקים"
    ]
  },
  {
    id: "toolbar",
    name: "Toolbar / ActionBar",
    nameEn: "Toolbar",
    description: "סרגל כלים עליון עם כותרת, כפתורים ותפריט.",
    theory: `Toolbar הוא סרגל כלים גמיש שמחליף את ה-ActionBar הישן.

יתרונות:
• גמישות בעיצוב ומיקום
• תמיכה ב-Navigation Drawer
• אפשרות להוספת Views מותאמים

רכיבים נפוצים:
• כותרת (Title)
• כפתור חזרה (Up/Back)
• תפריט פעולות (Options Menu)
• אייקונים`,
    codeExample: `// ========================================
// הגדרת Toolbar כ-ActionBar
// ========================================
public class MainActivity extends AppCompatActivity {
    private Toolbar toolbar;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        
        // הגדרת כותרת
        getSupportActionBar().setTitle("האפליקציה שלי");
        
        // הצגת כפתור חזרה
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }
    
    // יצירת תפריט
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }
    
    // טיפול בלחיצות על פריטי תפריט
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        
        if (id == android.R.id.home) {
            onBackPressed();
            return true;
        } else if (id == R.id.action_settings) {
            // פתיחת הגדרות
            return true;
        } else if (id == R.id.action_search) {
            // פתיחת חיפוש
            return true;
        }
        
        return super.onOptionsItemSelected(item);
    }
}

<!-- res/menu/main_menu.xml -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    
    <item
        android:id="@+id/action_search"
        android:icon="@drawable/ic_search"
        android:title="חיפוש"
        app:showAsAction="ifRoom" />
        
    <item
        android:id="@+id/action_settings"
        android:title="הגדרות"
        app:showAsAction="never" />
</menu>

<!-- res/layout/activity_main.xml -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/primary"
        app:titleTextColor="@color/white" />
    
    <!-- שאר התוכן -->
    
</LinearLayout>`,
    principles: [
      "AppCompat - תאימות לאחור",
      "Menu System - מערכת תפריטים גמישה",
      "Material Design - עיצוב עקבי",
      "Navigation - ניווט אחורה"
    ],
    tips: [
      "הגדר את ה-Toolbar ב-theme כ-NoActionBar",
      "השתמש ב-CollapsingToolbarLayout לאפקט מתקפל",
      "הוסף אייקונים רק לפעולות חשובות",
      "שקול להשתמש ב-SearchView לחיפוש"
    ]
  },
  {
    id: "seekbar",
    name: "SeekBar",
    nameEn: "SeekBar",
    description: "פס גלילה אינטראקטיבי לבחירת ערכים מספריים.",
    theory: `SeekBar הוא רכיב שמאפשר למשתמש לבחור ערך מספרי על ידי גרירת מחוון.

שימושים נפוצים:
• שליטה בעוצמת שמע
• בחירת מיקום בסרטון/שיר
• הגדרת בהירות
• בחירת טווח מחירים

מאפיינים עיקריים:
• max - ערך מקסימלי
• progress - ערך נוכחי
• thumb - עיצוב המחוון`,
    codeExample: `<!-- XML Layout -->
<SeekBar
    android:id="@+id/seekBar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:max="100"
    android:progress="50" />

// Java Code
SeekBar seekBar = findViewById(R.id.seekBar);

seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        // נקרא כאשר הערך משתנה
        tvValue.setText("ערך: " + progress);
    }
    
    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        // נקרא כאשר המשתמש מתחיל לגרור
    }
    
    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        // נקרא כאשר המשתמש מפסיק לגרור
        Toast.makeText(this, "ערך נבחר: " + seekBar.getProgress(), 
            Toast.LENGTH_SHORT).show();
    }
});

// שינוי ערך בקוד
seekBar.setProgress(75);`,
    principles: [
      "Event Driven - האזנה לשינויים בזמן אמת",
      "User Feedback - משוב מיידי למשתמש",
      "Range Selection - בחירה מטווח ערכים"
    ],
    tips: [
      "הצג את הערך הנוכחי ליד ה-SeekBar",
      "השתמש ב-fromUser כדי להבדיל בין שינוי ידני לתוכניתי",
      "הגדר step logic ב-onProgressChanged אם צריך קפיצות"
    ]
  },
  {
    id: "switch",
    name: "Switch",
    nameEn: "Switch / Toggle",
    description: "כפתור מתג להפעלה/כיבוי של אפשרויות.",
    theory: `Switch הוא רכיב לבחירה בינארית (כן/לא, פעיל/כבוי).

יתרונות על Checkbox:
• מראה מודרני יותר
• מתאים להגדרות
• משוב ויזואלי ברור

שימושים נפוצים:
• הגדרות (Dark Mode, התראות)
• הפעלה/כיבוי של תכונות
• אישור תנאים`,
    codeExample: `<!-- XML Layout -->
<Switch
    android:id="@+id/switchDarkMode"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="מצב כהה"
    android:checked="false" />

<!-- Material Design Switch -->
<com.google.android.material.switchmaterial.SwitchMaterial
    android:id="@+id/switchNotifications"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="התראות"
    app:thumbTint="@color/switch_thumb"
    app:trackTint="@color/switch_track" />

// Java Code
Switch switchDarkMode = findViewById(R.id.switchDarkMode);

switchDarkMode.setOnCheckedChangeListener((buttonView, isChecked) -> {
    if (isChecked) {
        // הופעל
        enableDarkMode();
        Toast.makeText(this, "מצב כהה הופעל", Toast.LENGTH_SHORT).show();
    } else {
        // כובה
        disableDarkMode();
        Toast.makeText(this, "מצב כהה כובה", Toast.LENGTH_SHORT).show();
    }
});

// שינוי מצב בקוד
switchDarkMode.setChecked(true);

// קריאת מצב
boolean isEnabled = switchDarkMode.isChecked();`,
    principles: [
      "Binary State - מצב בינארי ברור",
      "Immediate Feedback - שינוי מיידי",
      "Material Design - עיצוב עקבי"
    ],
    tips: [
      "השתמש ב-SwitchMaterial לעיצוב מודרני",
      "שמור את מצב ה-Switch ב-SharedPreferences",
      "הוסף טקסט שמסביר מה ה-Switch עושה"
    ]
  },
  {
    id: "logcat",
    name: "Logcat",
    nameEn: "Logcat Debugging",
    description: "כלי לכתיבת וקריאת הודעות debug באנדרואיד.",
    theory: `Logcat הוא מערכת הלוגים של אנדרואיד לצורכי debug.

רמות Log (מהנמוכה לגבוהה):
• Log.v() - Verbose (מפורט מאוד)
• Log.d() - Debug (ניפוי שגיאות)
• Log.i() - Info (מידע)
• Log.w() - Warning (אזהרה)
• Log.e() - Error (שגיאה)

יתרונות:
• עוקב אחרי זרימת הקוד
• מזהה שגיאות בזמן ריצה
• מציג ערכי משתנים`,
    codeExample: `// הגדרת TAG למחלקה
private static final String TAG = "MainActivity";

// שימושים בסיסיים
Log.d(TAG, "onCreate called");
Log.i(TAG, "User logged in successfully");
Log.w(TAG, "Network connection slow");
Log.e(TAG, "Failed to load data: " + error.getMessage());

// הדפסת ערכי משתנים
int userId = 123;
String userName = "ישראל";
Log.d(TAG, "User: " + userName + ", ID: " + userId);

// הדפסת ArrayList
ArrayList<String> items = new ArrayList<>();
items.add("פריט 1");
items.add("פריט 2");
Log.d(TAG, "Items: " + items.toString());

// הדפסת Exception מלא
try {
    // קוד שעלול לזרוק exception
    int result = 10 / 0;
} catch (Exception e) {
    Log.e(TAG, "Error occurred", e);
    // או
    e.printStackTrace();
}

// הדפסת אובייקט
Product product = new Product(1, "מוצר", 99.99);
Log.d(TAG, "Product: " + product.toString());

// שימוש ב-BuildConfig למניעת לוגים ב-Release
if (BuildConfig.DEBUG) {
    Log.d(TAG, "Debug message - won't appear in release");
}`,
    principles: [
      "Debug First - השתמש בלוגים לפני בדיקה",
      "Meaningful Tags - השתמש בשמות משמעותיים",
      "Log Levels - בחר רמה מתאימה",
      "Production Safety - הסר לוגים רגישים"
    ],
    tips: [
      "השתמש ב-TAG כשם המחלקה",
      "סנן לוגים ב-Logcat לפי TAG",
      "אל תשאיר Log.d בקוד production",
      "השתמש ב-Log.e עם Exception לקבלת stack trace מלא"
    ]
  },
  {
    id: "mediaplayer",
    name: "MediaPlayer",
    nameEn: "MediaPlayer",
    description: "רכיב להפעלת קבצי אודיו ווידאו.",
    theory: `MediaPlayer הוא מחלקה להפעלת מדיה באנדרואיד.

מקורות מדיה:
• קבצים מקומיים (res/raw)
• קבצים מהאחסון
• URL מהאינטרנט

מצבים עיקריים:
• Idle - לא מוכן
• Initialized - אותחל
• Prepared - מוכן להפעלה
• Started - מנגן
• Paused - מושהה
• Stopped - עצר`,
    codeExample: `// ========================================
// הפעלת קובץ מ-res/raw
// ========================================
MediaPlayer mediaPlayer;

// יצירה והפעלה
mediaPlayer = MediaPlayer.create(this, R.raw.song);
mediaPlayer.start();

// השהייה
mediaPlayer.pause();

// המשך
mediaPlayer.start();

// עצירה ושחרור
mediaPlayer.stop();
mediaPlayer.release();
mediaPlayer = null;

// ========================================
// הפעלה מ-URL
// ========================================
MediaPlayer urlPlayer = new MediaPlayer();

try {
    urlPlayer.setDataSource("https://example.com/audio.mp3");
    urlPlayer.prepareAsync(); // הכנה אסינכרונית
    
    urlPlayer.setOnPreparedListener(mp -> {
        // מוכן להפעלה
        mp.start();
    });
    
    urlPlayer.setOnCompletionListener(mp -> {
        // נגמר
        Toast.makeText(this, "הסתיים", Toast.LENGTH_SHORT).show();
    });
    
    urlPlayer.setOnErrorListener((mp, what, extra) -> {
        Log.e(TAG, "Error: " + what);
        return true;
    });
} catch (IOException e) {
    e.printStackTrace();
}

// ========================================
// שליטה מתקדמת
// ========================================
// קפיצה למיקום (מילישניות)
mediaPlayer.seekTo(30000); // 30 שניות

// קבלת אורך ומיקום
int duration = mediaPlayer.getDuration();
int currentPosition = mediaPlayer.getCurrentPosition();

// עוצמת שמע (0.0 - 1.0)
mediaPlayer.setVolume(0.5f, 0.5f);

// לופ
mediaPlayer.setLooping(true);`,
    principles: [
      "Lifecycle Management - שחרור משאבים",
      "Async Preparation - הכנה אסינכרונית ל-URL",
      "Error Handling - טיפול בשגיאות",
      "State Machine - ניהול מצבים"
    ],
    tips: [
      "תמיד שחרר את ה-MediaPlayer ב-onDestroy",
      "השתמש ב-prepareAsync לקבצים מהרשת",
      "הוסף OnCompletionListener לידע מתי נגמר",
      "שקול להשתמש ב-ExoPlayer לפונקציונליות מתקדמת"
    ]
  },
  {
    id: "alertdialog",
    name: "AlertDialog",
    nameEn: "AlertDialog",
    description: "תיבת דו-שיח להודעות ואישורים מהמשתמש.",
    theory: `AlertDialog היא תיבת דו-שיח סטנדרטית באנדרואיד.

רכיבים:
• Title - כותרת
• Message - הודעה
• Positive Button - כפתור אישור
• Negative Button - כפתור ביטול
• Neutral Button - כפתור נייטרלי

סוגים:
• הודעה פשוטה
• אישור פעולה
• בחירה מרשימה
• בחירה מרובה
• קלט מותאם`,
    codeExample: `// ========================================
// דיאלוג פשוט עם הודעה
// ========================================
new AlertDialog.Builder(this)
    .setTitle("שים לב")
    .setMessage("האם אתה בטוח שברצונך למחוק?")
    .setPositiveButton("כן", (dialog, which) -> {
        // המשתמש לחץ אישור
        deleteItem();
    })
    .setNegativeButton("לא", (dialog, which) -> {
        // המשתמש לחץ ביטול
        dialog.dismiss();
    })
    .setIcon(R.drawable.ic_warning)
    .show();

// ========================================
// דיאלוג עם בחירה יחידה
// ========================================
String[] colors = {"אדום", "ירוק", "כחול"};
int checkedItem = 0;

new AlertDialog.Builder(this)
    .setTitle("בחר צבע")
    .setSingleChoiceItems(colors, checkedItem, (dialog, which) -> {
        selectedColor = colors[which];
    })
    .setPositiveButton("אישור", (dialog, which) -> {
        Toast.makeText(this, "נבחר: " + selectedColor, 
            Toast.LENGTH_SHORT).show();
    })
    .setNegativeButton("ביטול", null)
    .show();

// ========================================
// דיאלוג עם בחירה מרובה
// ========================================
String[] items = {"WiFi", "Bluetooth", "GPS"};
boolean[] checkedItems = {true, false, true};

new AlertDialog.Builder(this)
    .setTitle("בחר אפשרויות")
    .setMultiChoiceItems(items, checkedItems, (dialog, which, isChecked) -> {
        checkedItems[which] = isChecked;
    })
    .setPositiveButton("אישור", (dialog, which) -> {
        // עיבוד הבחירות
    })
    .show();

// ========================================
// דיאלוג עם View מותאם
// ========================================
View customView = getLayoutInflater().inflate(R.layout.dialog_custom, null);
EditText editText = customView.findViewById(R.id.editText);

new AlertDialog.Builder(this)
    .setTitle("הזן שם")
    .setView(customView)
    .setPositiveButton("שמור", (dialog, which) -> {
        String name = editText.getText().toString();
        saveName(name);
    })
    .setNegativeButton("ביטול", null)
    .show();`,
    principles: [
      "Builder Pattern - בנייה שלב אחר שלב",
      "User Confirmation - אישור פעולות חשובות",
      "Flexible Content - תוכן גמיש",
      "Material Design - עיצוב עקבי"
    ],
    tips: [
      "השתמש ב-setCancelable(false) למנוע סגירה בלחיצה בחוץ",
      "הוסף אייקון לדיאלוגים חשובים",
      "הגבל את אורך ההודעה",
      "שקול להשתמש ב-DialogFragment לדיאלוגים מורכבים"
    ]
  },
  {
    id: "lottie",
    name: "Lottie Animations",
    nameEn: "Lottie",
    description: "אנימציות וקטוריות איכותיות וקלות משקל לאפליקציה.",
    theory: `Lottie היא ספריית אנימציות מבית Airbnb.

יתרונות:
• קבצים קטנים (JSON)
• איכות וקטורית - נראה טוב בכל גודל
• קל לשימוש
• אנימציות מורכבות בקלות

מקורות אנימציות חינמיות:
• LottieFiles.com
• IconScout
• Lordicon`,
    codeExample: `// build.gradle (dependencies)
implementation 'com.airbnb.android:lottie:6.0.0'

<!-- XML Layout -->
<com.airbnb.lottie.LottieAnimationView
    android:id="@+id/lottieAnimation"
    android:layout_width="200dp"
    android:layout_height="200dp"
    app:lottie_rawRes="@raw/loading_animation"
    app:lottie_autoPlay="true"
    app:lottie_loop="true" />

// Java Code
LottieAnimationView lottieView = findViewById(R.id.lottieAnimation);

// הפעלה מקובץ res/raw
lottieView.setAnimation(R.raw.success_animation);
lottieView.playAnimation();

// הפעלה מ-URL
lottieView.setAnimationFromUrl("https://assets.lottiefiles.com/...");
lottieView.playAnimation();

// שליטה באנימציה
lottieView.pauseAnimation();
lottieView.resumeAnimation();
lottieView.cancelAnimation();

// לופ
lottieView.setRepeatCount(LottieDrawable.INFINITE);

// מהירות
lottieView.setSpeed(2.0f); // כפול מהר

// האזנה לסיום
lottieView.addAnimatorListener(new Animator.AnimatorListener() {
    @Override
    public void onAnimationEnd(Animator animation) {
        // האנימציה הסתיימה
        showNextScreen();
    }
    // ... שאר המתודות
});

// הפעלה לאחור
lottieView.setSpeed(-1f);

// קפיצה לפריים ספציפי
lottieView.setFrame(50);`,
    principles: [
      "Vector Graphics - גרפיקה וקטורית",
      "JSON Based - קבצים קלים",
      "Designer-Developer Workflow - עבודה משותפת",
      "Cross Platform - עובד גם ב-iOS ו-Web"
    ],
    tips: [
      "הורד אנימציות חינמיות מ-LottieFiles.com",
      "שמור קבצי JSON ב-res/raw",
      "השתמש באנימציות קלות משקל",
      "בדוק שהאנימציה לא כבדה מדי על המכשיר"
    ]
  },
  {
    id: "textinputedittext",
    name: "TextInputEditText",
    nameEn: "TextInputEditText",
    description: "שדה טקסט מתקדם עם תמיכה ב-Material Design.",
    theory: `TextInputLayout + TextInputEditText הם רכיבי Material Design לקלט טקסט.

יתרונות על EditText רגיל:
• Floating Label (תווית צפה)
• Error Messages
• Character Counter
• Password Toggle
• Helper Text
• Start/End Icons`,
    codeExample: `<!-- XML Layout -->
<com.google.android.material.textfield.TextInputLayout
    android:id="@+id/tilEmail"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="אימייל"
    app:startIconDrawable="@drawable/ic_email"
    app:errorEnabled="true"
    app:counterEnabled="true"
    app:counterMaxLength="50"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">
    
    <com.google.android.material.textfield.TextInputEditText
        android:id="@+id/etEmail"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textEmailAddress" />
        
</com.google.android.material.textfield.TextInputLayout>

<!-- Password Field with Toggle -->
<com.google.android.material.textfield.TextInputLayout
    android:id="@+id/tilPassword"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="סיסמה"
    app:passwordToggleEnabled="true"
    app:startIconDrawable="@drawable/ic_lock"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">
    
    <com.google.android.material.textfield.TextInputEditText
        android:id="@+id/etPassword"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPassword" />
        
</com.google.android.material.textfield.TextInputLayout>

// Java Code - Validation
TextInputLayout tilEmail = findViewById(R.id.tilEmail);
TextInputEditText etEmail = findViewById(R.id.etEmail);

btnSubmit.setOnClickListener(v -> {
    String email = etEmail.getText().toString().trim();
    
    if (email.isEmpty()) {
        tilEmail.setError("שדה חובה");
    } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
        tilEmail.setError("אימייל לא תקין");
    } else {
        tilEmail.setError(null); // הסרת שגיאה
        // המשך עיבוד
    }
});

// האזנה לשינויים
etEmail.addTextChangedListener(new TextWatcher() {
    @Override
    public void afterTextChanged(Editable s) {
        // ניקוי שגיאה בעת הקלדה
        tilEmail.setError(null);
    }
    // ... שאר המתודות
});`,
    principles: [
      "Material Design Guidelines - עקביות עיצובית",
      "Input Validation - ולידציה של קלט",
      "User Feedback - משוב מיידי למשתמש",
      "Accessibility - נגישות מובנית"
    ],
    tips: [
      "השתמש ב-OutlinedBox או FilledBox style",
      "הוסף helperText להנחיות",
      "השתמש ב-endIconMode לפעולות נוספות",
      "אל תשכח app:errorEnabled=\"true\""
    ]
  },
  {
    id: "fab",
    name: "FloatingActionButton",
    nameEn: "FAB",
    description: "כפתור צף לפעולה ראשית במסך.",
    theory: `FAB (FloatingActionButton) הוא כפתור צף לפעולה העיקרית במסך.

עקרונות Material Design:
• פעולה ראשית אחת בלבד
• מיקום קבוע (בדרך כלל ימין למטה)
• אייקון ברור ופשוט
• צבע בולט

סוגים:
• Regular - רגיל
• Mini - קטן
• Extended - עם טקסט`,
    codeExample: `<!-- XML Layout - FAB רגיל -->
<com.google.android.material.floatingactionbutton.FloatingActionButton
    android:id="@+id/fabAdd"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom|end"
    android:layout_margin="16dp"
    android:src="@drawable/ic_add"
    app:backgroundTint="@color/primary"
    app:tint="@android:color/white" />

<!-- Extended FAB with Text -->
<com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
    android:id="@+id/extendedFab"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom|end"
    android:layout_margin="16dp"
    android:text="הוסף מוצר"
    app:icon="@drawable/ic_add" />

// Java Code
FloatingActionButton fab = findViewById(R.id.fabAdd);

fab.setOnClickListener(v -> {
    // פתיחת מסך הוספה
    Intent intent = new Intent(this, AddItemActivity.class);
    startActivity(intent);
});

// הסתרה והצגה
fab.hide();
fab.show();

// Extended FAB - כיווץ והרחבה
ExtendedFloatingActionButton extendedFab = findViewById(R.id.extendedFab);
extendedFab.shrink(); // הסתרת טקסט
extendedFab.extend(); // הצגת טקסט

// הסתרה בגלילה
recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
    @Override
    public void onScrolled(@NonNull RecyclerView rv, int dx, int dy) {
        if (dy > 0) {
            fab.hide(); // גלילה למטה - הסתר
        } else if (dy < 0) {
            fab.show(); // גלילה למעלה - הצג
        }
    }
});`,
    principles: [
      "Primary Action - פעולה ראשית בלבד",
      "Consistent Position - מיקום קבוע",
      "Material Design - עיצוב עקבי",
      "Scroll Behavior - התנהגות בגלילה"
    ],
    tips: [
      "השתמש ב-FAB רק לפעולה הכי חשובה",
      "הסתר את ה-FAB בגלילה למטה",
      "השתמש ב-Extended FAB כשצריך להבהיר את הפעולה",
      "וודא שהאייקון ברור ומובן"
    ]
  },
  {
    id: "circleimageview",
    name: "CircleImageView",
    nameEn: "CircleImageView",
    description: "תצוגת תמונה עגולה לתמונות פרופיל.",
    theory: `CircleImageView היא ספרייה להצגת תמונות בצורה עגולה.

שימושים נפוצים:
• תמונות פרופיל
• אווטארים
• אייקונים עגולים

חלופות:
• ShapeableImageView (Material)
• Glide CircleCrop
• Coil CircleCrop`,
    codeExample: `// build.gradle (dependencies)
implementation 'de.hdodenhof:circleimageview:3.1.0'

<!-- XML Layout -->
<de.hdodenhof.circleimageview.CircleImageView
    android:id="@+id/profileImage"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:src="@drawable/default_avatar"
    app:civ_border_width="2dp"
    app:civ_border_color="@color/primary"
    app:civ_circle_background_color="@color/gray" />

// Java Code
CircleImageView profileImage = findViewById(R.id.profileImage);

// טעינה עם Glide
Glide.with(this)
    .load(imageUrl)
    .placeholder(R.drawable.default_avatar)
    .error(R.drawable.default_avatar)
    .into(profileImage);

// ========================================
// חלופה עם ShapeableImageView (Material)
// ========================================
<com.google.android.material.imageview.ShapeableImageView
    android:id="@+id/shapeableImage"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:scaleType="centerCrop"
    app:shapeAppearanceOverlay="@style/CircleImage"
    app:strokeWidth="2dp"
    app:strokeColor="@color/primary" />

<!-- styles.xml -->
<style name="CircleImage">
    <item name="cornerFamily">rounded</item>
    <item name="cornerSize">50%</item>
</style>

// ========================================
// חלופה עם Glide בלבד
// ========================================
Glide.with(this)
    .load(imageUrl)
    .circleCrop() // הופך לעיגול
    .placeholder(R.drawable.default_avatar)
    .into(regularImageView);`,
    principles: [
      "Profile Images - תמונות פרופיל עגולות",
      "Border Support - תמיכה במסגרת",
      "Library vs Built-in - ספרייה מול מובנה"
    ],
    tips: [
      "השתמש ב-ShapeableImageView אם אפשר (מובנה)",
      "הוסף placeholder לזמן טעינה",
      "הגדר גודל קבוע לתמונה",
      "השתמש ב-Glide או Picasso לטעינת תמונות מהרשת"
    ]
  },
  {
    id: "chip",
    name: "Chip",
    nameEn: "Chip",
    description: "רכיב קומפקטי להצגת מידע, בחירות או סינון.",
    theory: `Chip הוא רכיב קומפקטי מ-Material Design.

סוגי Chips:
• Action - ביצוע פעולה
• Filter - סינון
• Choice - בחירה
• Input - קלט עם מחיקה

שימושים:
• תגיות (Tags)
• סינון
• בחירה מרובה
• הצגת נתונים`,
    codeExample: `<!-- XML Layout - Chip בודד -->
<com.google.android.material.chip.Chip
    android:id="@+id/chipExample"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="דוגמה"
    app:chipIcon="@drawable/ic_star"
    app:closeIconVisible="true" />

<!-- ChipGroup - קבוצת Chips -->
<com.google.android.material.chip.ChipGroup
    android:id="@+id/chipGroup"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:singleSelection="true"
    app:selectionRequired="true">
    
    <com.google.android.material.chip.Chip
        android:id="@+id/chipAll"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="הכל"
        style="@style/Widget.MaterialComponents.Chip.Choice"
        android:checked="true" />
        
    <com.google.android.material.chip.Chip
        android:id="@+id/chipNew"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="חדש"
        style="@style/Widget.MaterialComponents.Chip.Choice" />
        
    <com.google.android.material.chip.Chip
        android:id="@+id/chipPopular"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="פופולרי"
        style="@style/Widget.MaterialComponents.Chip.Choice" />
        
</com.google.android.material.chip.ChipGroup>

// Java Code
ChipGroup chipGroup = findViewById(R.id.chipGroup);

// האזנה לבחירה
chipGroup.setOnCheckedStateChangeListener((group, checkedIds) -> {
    if (!checkedIds.isEmpty()) {
        int checkedId = checkedIds.get(0);
        if (checkedId == R.id.chipAll) {
            showAll();
        } else if (checkedId == R.id.chipNew) {
            showNew();
        } else if (checkedId == R.id.chipPopular) {
            showPopular();
        }
    }
});

// הוספת Chip דינמית
Chip newChip = new Chip(this);
newChip.setText("תגית חדשה");
newChip.setCloseIconVisible(true);
newChip.setOnCloseIconClickListener(v -> {
    chipGroup.removeView(newChip);
});
chipGroup.addView(newChip);`,
    principles: [
      "Compact UI - רכיב קומפקטי",
      "Material Design - עיצוב עקבי",
      "Selection Modes - מצבי בחירה שונים",
      "Dynamic Content - תוכן דינמי"
    ],
    tips: [
      "בחר style מתאים (Choice, Filter, Action)",
      "השתמש ב-ChipGroup לבחירה",
      "הוסף אייקונים להבהרה",
      "אפשר מחיקה עם closeIcon"
    ]
  },
  {
    id: "divider",
    name: "Divider",
    nameEn: "Divider",
    description: "קו הפרדה בין רכיבים.",
    theory: `Divider הוא קו הפרדה ויזואלי בין רכיבים.

סוגים:
• Full bleed - רוחב מלא
• Inset - עם שוליים
• Middle - באמצע

שימושים:
• הפרדה ברשימות
• חלוקת סקציות
• הבהרת היררכיה`,
    codeExample: `<!-- XML Layout -->
<!-- View פשוט -->
<View
    android:layout_width="match_parent"
    android:layout_height="1dp"
    android:background="@color/divider" />

<!-- Material Divider -->
<com.google.android.material.divider.MaterialDivider
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:dividerColor="@color/divider"
    app:dividerInsetStart="16dp"
    app:dividerInsetEnd="16dp" />

<!-- Divider אנכי -->
<View
    android:layout_width="1dp"
    android:layout_height="match_parent"
    android:background="@color/divider" />

<!-- בתוך LinearLayout -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:divider="@drawable/divider"
    android:showDividers="middle">
    
    <!-- items -->
    
</LinearLayout>

<!-- res/drawable/divider.xml -->
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <size android:height="1dp" />
    <solid android:color="@color/divider" />
</shape>

// ========================================
// Divider ב-RecyclerView
// ========================================
DividerItemDecoration divider = new DividerItemDecoration(
    this, DividerItemDecoration.VERTICAL);
recyclerView.addItemDecoration(divider);

// Divider מותאם
MaterialDividerItemDecoration customDivider = 
    new MaterialDividerItemDecoration(this, LinearLayoutManager.VERTICAL);
customDivider.setDividerInsetStart(16);
customDivider.setDividerInsetEnd(16);
recyclerView.addItemDecoration(customDivider);`,
    principles: [
      "Visual Hierarchy - היררכיה ויזואלית",
      "Content Separation - הפרדת תוכן",
      "Consistent Styling - עיצוב עקבי"
    ],
    tips: [
      "השתמש בצבע עדין (לא שחור מלא)",
      "הוסף שוליים לדיבידר לא full-bleed",
      "השתמש ב-MaterialDividerItemDecoration ל-RecyclerView"
    ]
  },
  {
    id: "customdialog",
    name: "Custom Dialog",
    nameEn: "Custom Dialog",
    description: "תיבת דו-שיח מותאמת אישית עם עיצוב ייחודי.",
    theory: `Custom Dialog מאפשר לעצב תיבת דו-שיח לפי הצורך.

גישות:
• AlertDialog עם Custom View
• Dialog class
• DialogFragment (מומלץ)

יתרונות DialogFragment:
• ניהול מחזור חיים
• שמירת מצב בסיבוב
• שימוש חוזר`,
    codeExample: `// ========================================
// שיטה 1: AlertDialog עם Custom View
// ========================================
View dialogView = getLayoutInflater().inflate(R.layout.dialog_custom, null);
EditText etName = dialogView.findViewById(R.id.etName);
EditText etEmail = dialogView.findViewById(R.id.etEmail);

AlertDialog dialog = new AlertDialog.Builder(this)
    .setView(dialogView)
    .setPositiveButton("שמור", (d, which) -> {
        String name = etName.getText().toString();
        String email = etEmail.getText().toString();
        saveData(name, email);
    })
    .setNegativeButton("ביטול", null)
    .create();

// עיצוב רקע שקוף
dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
dialog.show();

// ========================================
// שיטה 2: Dialog class
// ========================================
Dialog customDialog = new Dialog(this);
customDialog.setContentView(R.layout.dialog_custom);
customDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

Button btnClose = customDialog.findViewById(R.id.btnClose);
btnClose.setOnClickListener(v -> customDialog.dismiss());

customDialog.show();

// ========================================
// שיטה 3: DialogFragment (מומלץ)
// ========================================
public class CustomDialogFragment extends DialogFragment {
    
    public interface DialogListener {
        void onDialogPositiveClick(String data);
    }
    
    private DialogListener listener;
    
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        listener = (DialogListener) context;
    }
    
    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        View view = getLayoutInflater().inflate(R.layout.dialog_custom, null);
        EditText etInput = view.findViewById(R.id.etInput);
        
        return new AlertDialog.Builder(requireContext())
            .setTitle("הזן מידע")
            .setView(view)
            .setPositiveButton("אישור", (dialog, which) -> {
                listener.onDialogPositiveClick(etInput.getText().toString());
            })
            .setNegativeButton("ביטול", null)
            .create();
    }
}

// שימוש:
CustomDialogFragment dialog = new CustomDialogFragment();
dialog.show(getSupportFragmentManager(), "custom_dialog");

<!-- res/layout/dialog_custom.xml -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:padding="24dp"
    android:background="@drawable/dialog_background">
    
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="כותרת"
        android:textSize="20sp"
        android:textStyle="bold" />
        
    <EditText
        android:id="@+id/etInput"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="הקלד כאן..."
        android:layout_marginTop="16dp" />
        
</LinearLayout>`,
    principles: [
      "Custom Layout - עיצוב מותאם",
      "DialogFragment - ניהול מחזור חיים",
      "Callback Pattern - החזרת נתונים",
      "Reusability - שימוש חוזר"
    ],
    tips: [
      "השתמש ב-DialogFragment לדיאלוגים מורכבים",
      "הגדר רקע שקוף לעיצוב מותאם",
      "השתמש ב-interface להחזרת נתונים",
      "שמור מצב ב-savedInstanceState"
    ]
  },
  {
    id: "popupmenu",
    name: "Popup Menu",
    nameEn: "Popup Menu",
    description: "תפריט קופץ הצמוד לרכיב מסוים.",
    theory: `PopupMenu הוא תפריט שמופיע ליד רכיב מסוים.

שימושים:
• תפריט שלוש נקודות
• אפשרויות לפריט ברשימה
• פעולות נוספות

יתרונות:
• לא תופס מקום קבוע
• קשור לרכיב ספציפי
• מוכר למשתמשים`,
    codeExample: `// יצירת תפריט
ImageButton btnMore = findViewById(R.id.btnMore);

btnMore.setOnClickListener(v -> {
    PopupMenu popup = new PopupMenu(this, v);
    popup.getMenuInflater().inflate(R.menu.popup_menu, popup.getMenu());
    
    popup.setOnMenuItemClickListener(item -> {
        int id = item.getItemId();
        if (id == R.id.action_edit) {
            editItem();
            return true;
        } else if (id == R.id.action_delete) {
            deleteItem();
            return true;
        } else if (id == R.id.action_share) {
            shareItem();
            return true;
        }
        return false;
    });
    
    popup.show();
});

// עם Gravity
PopupMenu popup = new PopupMenu(this, v, Gravity.END);

// הצגת אייקונים (Android 10+)
popup.setForceShowIcon(true);

<!-- res/menu/popup_menu.xml -->
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/action_edit"
        android:icon="@drawable/ic_edit"
        android:title="עריכה" />
    <item
        android:id="@+id/action_delete"
        android:icon="@drawable/ic_delete"
        android:title="מחיקה" />
    <item
        android:id="@+id/action_share"
        android:icon="@drawable/ic_share"
        android:title="שיתוף" />
</menu>

// ========================================
// שימוש ב-RecyclerView
// ========================================
// ב-ViewHolder או Adapter
holder.btnMore.setOnClickListener(v -> {
    PopupMenu popup = new PopupMenu(context, v);
    popup.inflate(R.menu.item_menu);
    
    popup.setOnMenuItemClickListener(item -> {
        int position = holder.getAdapterPosition();
        Product product = products.get(position);
        
        if (item.getItemId() == R.id.action_delete) {
            listener.onDeleteClick(product, position);
            return true;
        }
        return false;
    });
    
    popup.show();
});`,
    principles: [
      "Contextual Actions - פעולות הקשריות",
      "Anchor View - קשור לרכיב",
      "Menu Resource - שימוש ב-XML",
      "Click Handling - טיפול בלחיצות"
    ],
    tips: [
      "השתמש ב-setForceShowIcon להצגת אייקונים",
      "הגדר Gravity מתאים",
      "השתמש ב-PopupMenu לכפתור 3 נקודות",
      "שקול ListPopupWindow לתפריטים מורכבים"
    ]
  },
  {
    id: "navigationdrawer",
    name: "Navigation Drawer",
    nameEn: "Navigation Drawer",
    description: "תפריט צד נשלף לניווט באפליקציה.",
    theory: `Navigation Drawer הוא תפריט צד שנפתח בהחלקה או בלחיצה.

רכיבים:
• DrawerLayout - מכיל הכל
• NavigationView - התפריט עצמו
• Header - כותרת עם מידע משתמש
• Menu - פריטי ניווט

מתי להשתמש:
• 5+ יעדי ניווט
• ניווט לא תדיר
• צורך במידע נוסף (פרופיל)`,
    codeExample: `<!-- res/layout/activity_main.xml -->
<androidx.drawerlayout.widget.DrawerLayout
    android:id="@+id/drawerLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    
    <!-- Main Content -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">
        
        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize" />
            
        <FrameLayout
            android:id="@+id/fragmentContainer"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
            
    </LinearLayout>
    
    <!-- Navigation Drawer -->
    <com.google.android.material.navigation.NavigationView
        android:id="@+id/navView"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        app:headerLayout="@layout/nav_header"
        app:menu="@menu/nav_menu" />
        
</androidx.drawerlayout.widget.DrawerLayout>

<!-- res/layout/nav_header.xml -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="180dp"
    android:orientation="vertical"
    android:padding="16dp"
    android:background="@color/primary">
    
    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/ivProfile"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:src="@drawable/default_avatar" />
        
    <TextView
        android:id="@+id/tvName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="שם המשתמש"
        android:textColor="@android:color/white"
        android:textSize="18sp"
        android:layout_marginTop="8dp" />
        
</LinearLayout>

<!-- res/menu/nav_menu.xml -->
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <group android:checkableBehavior="single">
        <item android:id="@+id/nav_home"
            android:icon="@drawable/ic_home"
            android:title="בית" />
        <item android:id="@+id/nav_profile"
            android:icon="@drawable/ic_person"
            android:title="פרופיל" />
        <item android:id="@+id/nav_settings"
            android:icon="@drawable/ic_settings"
            android:title="הגדרות" />
    </group>
    
    <item android:title="אחר">
        <menu>
            <item android:id="@+id/nav_about"
                android:icon="@drawable/ic_info"
                android:title="אודות" />
            <item android:id="@+id/nav_logout"
                android:icon="@drawable/ic_logout"
                android:title="התנתק" />
        </menu>
    </item>
</menu>

// Java Code
public class MainActivity extends AppCompatActivity {
    private DrawerLayout drawerLayout;
    private NavigationView navView;
    private ActionBarDrawerToggle toggle;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        
        drawerLayout = findViewById(R.id.drawerLayout);
        navView = findViewById(R.id.navView);
        
        // Hamburger icon
        toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar,
            R.string.open, R.string.close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        
        // Navigation handling
        navView.setNavigationItemSelectedListener(item -> {
            int id = item.getItemId();
            
            if (id == R.id.nav_home) {
                loadFragment(new HomeFragment());
            } else if (id == R.id.nav_profile) {
                loadFragment(new ProfileFragment());
            } else if (id == R.id.nav_logout) {
                logout();
            }
            
            drawerLayout.closeDrawer(GravityCompat.START);
            return true;
        });
    }
    
    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }
}`,
    principles: [
      "DrawerLayout Container - מכיל תוכן ותפריט",
      "NavigationView - תפריט מובנה",
      "ActionBarDrawerToggle - אייקון המבורגר",
      "Header & Menu - כותרת ופריטים"
    ],
    tips: [
      "הוסף Header עם מידע משתמש",
      "השתמש ב-groups לחלוקה לקטגוריות",
      "סגור את ה-Drawer ב-onBackPressed",
      "השתמש ב-checkableBehavior לסימון הנבחר"
    ]
  },
  {
    id: "spinner",
    name: "Spinner",
    nameEn: "Spinner / Dropdown",
    description: "רשימה נפתחת לבחירת אפשרות אחת.",
    theory: `Spinner הוא רכיב לבחירה מרשימה נפתחת.

שימושים:
• בחירת עיר/מדינה
• בחירת קטגוריה
• סינון תוצאות
• בחירת כמות

רכיבים:
• Spinner - הרכיב הראשי
• Adapter - מחבר נתונים
• Layout - עיצוב פריט`,
    codeExample: `<!-- XML Layout -->
<Spinner
    android:id="@+id/spinnerCity"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:prompt="@string/select_city" />

// ========================================
// Spinner עם Array מקומי
// ========================================
Spinner spinner = findViewById(R.id.spinnerCity);

String[] cities = {"תל אביב", "ירושלים", "חיפה", "באר שבע"};

ArrayAdapter<String> adapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_spinner_item,
    cities
);
adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
spinner.setAdapter(adapter);

// האזנה לבחירה
spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        String selectedCity = cities[position];
        Toast.makeText(MainActivity.this, 
            "נבחר: " + selectedCity, Toast.LENGTH_SHORT).show();
    }
    
    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        // לא נבחר כלום
    }
});

// בחירה תוכניתית
spinner.setSelection(2); // בחירת פריט שלישי

// ========================================
// Spinner עם ArrayList
// ========================================
ArrayList<String> categories = new ArrayList<>();
categories.add("אלקטרוניקה");
categories.add("ביגוד");
categories.add("ספרים");

ArrayAdapter<String> categoryAdapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_spinner_item,
    categories
);
categoryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
spinnerCategory.setAdapter(categoryAdapter);

// הוספת פריט לרשימה
categories.add("ריהוט");
categoryAdapter.notifyDataSetChanged();

// ========================================
// Spinner עם strings.xml
// ========================================
<!-- res/values/strings.xml -->
<string-array name="countries">
    <item>ישראל</item>
    <item>ארה"ב</item>
    <item>בריטניה</item>
</string-array>

// Java
ArrayAdapter<CharSequence> countryAdapter = ArrayAdapter.createFromResource(
    this,
    R.array.countries,
    android.R.layout.simple_spinner_item
);
countryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
spinnerCountry.setAdapter(countryAdapter);`,
    principles: [
      "Adapter Pattern - חיבור נתונים לתצוגה",
      "Selection Handling - טיפול בבחירה",
      "Resource Arrays - שימוש ב-strings.xml"
    ],
    tips: [
      "השתמש ב-string-array לרשימות קבועות",
      "הוסף פריט ריק ראשון אם צריך placeholder",
      "השתמש ב-notifyDataSetChanged לעדכון",
      "שקול AutoCompleteTextView לרשימות ארוכות"
    ]
  },
  {
    id: "listview",
    name: "ListView",
    nameEn: "ListView",
    description: "רשימה פשוטה להצגת פריטים (מומלץ RecyclerView).",
    theory: `ListView הוא רכיב להצגת רשימות באנדרואיד.

הערה: כיום מומלץ להשתמש ב-RecyclerView שמספק ביצועים טובים יותר.

מתי עדיין להשתמש ב-ListView:
• רשימות קצרות וקבועות
• צורך בפשטות
• תאימות לאחור`,
    codeExample: `<!-- XML Layout -->
<ListView
    android:id="@+id/listView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:divider="@color/divider"
    android:dividerHeight="1dp" />

// ========================================
// ArrayAdapter פשוט
// ========================================
ListView listView = findViewById(R.id.listView);

String[] items = {"פריט 1", "פריט 2", "פריט 3"};

ArrayAdapter<String> adapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_list_item_1,
    items
);
listView.setAdapter(adapter);

listView.setOnItemClickListener((parent, view, position, id) -> {
    String item = items[position];
    Toast.makeText(this, "נבחר: " + item, Toast.LENGTH_SHORT).show();
});

// ========================================
// Custom Adapter
// ========================================
public class ProductAdapter extends ArrayAdapter<Product> {
    public ProductAdapter(Context context, ArrayList<Product> products) {
        super(context, 0, products);
    }
    
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Product product = getItem(position);
        
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext())
                .inflate(R.layout.item_product, parent, false);
        }
        
        TextView tvName = convertView.findViewById(R.id.tvName);
        TextView tvPrice = convertView.findViewById(R.id.tvPrice);
        
        tvName.setText(product.getName());
        tvPrice.setText(String.format("₪%.2f", product.getPrice()));
        
        return convertView;
    }
}

// שימוש
ArrayList<Product> products = new ArrayList<>();
products.add(new Product("מוצר 1", 99.99));
products.add(new Product("מוצר 2", 149.99));

ProductAdapter adapter = new ProductAdapter(this, products);
listView.setAdapter(adapter);`,
    principles: [
      "Adapter Pattern - חיבור נתונים",
      "convertView Recycling - שימוש חוזר ב-Views",
      "Simple vs Custom - פשוט מול מותאם"
    ],
    tips: [
      "שקול RecyclerView במקום ListView",
      "השתמש ב-ViewHolder pattern לביצועים",
      "מחזר את convertView",
      "השתמש ב-notifyDataSetChanged לעדכון"
    ]
  },
  {
    id: "calendarevent",
    name: "Calendar Event",
    nameEn: "Add Calendar Event",
    description: "הוספת אירוע ליומן המכשיר.",
    theory: `ניתן להוסיף אירועים ליומן המכשיר בשתי דרכים:

1. Intent - פותח את אפליקציית היומן
2. ContentProvider - הוספה ישירה (דורש הרשאות)

היתרון של Intent:
• לא דורש הרשאות
• המשתמש רואה ומאשר
• פשוט יותר`,
    codeExample: `// ========================================
// שיטה 1: Intent (מומלץ)
// ========================================
private void addEventToCalendar(String title, String location, 
        long startTime, long endTime) {
    
    Intent intent = new Intent(Intent.ACTION_INSERT);
    intent.setData(CalendarContract.Events.CONTENT_URI);
    
    intent.putExtra(CalendarContract.Events.TITLE, title);
    intent.putExtra(CalendarContract.Events.EVENT_LOCATION, location);
    intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startTime);
    intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endTime);
    intent.putExtra(CalendarContract.Events.DESCRIPTION, "תיאור האירוע");
    intent.putExtra(CalendarContract.Events.ALL_DAY, false);
    
    // התראה לפני האירוע
    intent.putExtra(CalendarContract.Reminders.MINUTES, 30);
    
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    } else {
        Toast.makeText(this, "לא נמצאה אפליקציית יומן", 
            Toast.LENGTH_SHORT).show();
    }
}

// שימוש
Calendar startCal = Calendar.getInstance();
startCal.set(2024, Calendar.MARCH, 15, 10, 0); // 15.3.24 בשעה 10:00

Calendar endCal = Calendar.getInstance();
endCal.set(2024, Calendar.MARCH, 15, 11, 0); // 15.3.24 בשעה 11:00

addEventToCalendar(
    "פגישה עם לקוח",
    "תל אביב",
    startCal.getTimeInMillis(),
    endCal.getTimeInMillis()
);

// ========================================
// שיטה 2: ContentProvider (דורש הרשאות)
// ========================================
// AndroidManifest.xml
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
<uses-permission android:name="android.permission.READ_CALENDAR" />

// הוספה ישירה
private void addEventDirectly(String title, long startTime, long endTime) {
    ContentResolver cr = getContentResolver();
    ContentValues values = new ContentValues();
    
    values.put(CalendarContract.Events.DTSTART, startTime);
    values.put(CalendarContract.Events.DTEND, endTime);
    values.put(CalendarContract.Events.TITLE, title);
    values.put(CalendarContract.Events.CALENDAR_ID, 1);
    values.put(CalendarContract.Events.EVENT_TIMEZONE, 
        TimeZone.getDefault().getID());
    
    Uri uri = cr.insert(CalendarContract.Events.CONTENT_URI, values);
    
    if (uri != null) {
        Toast.makeText(this, "האירוע נוסף ליומן", 
            Toast.LENGTH_SHORT).show();
    }
}`,
    principles: [
      "Intent vs ContentProvider - שתי גישות",
      "Permission Handling - הרשאות",
      "Calendar Contract - API היומן",
      "User Consent - הסכמת משתמש"
    ],
    tips: [
      "העדף Intent - לא דורש הרשאות",
      "השתמש ב-Calendar לחישוב תאריכים",
      "הוסף TimeZone לאירועים",
      "בדוק resolveActivity לפני startActivity"
    ]
  },
  {
    id: "videoview",
    name: "VideoView",
    nameEn: "VideoView",
    description: "רכיב להפעלת סרטוני וידאו.",
    theory: `VideoView הוא רכיב פשוט להפעלת וידאו.

מקורות:
• קבצים מקומיים (res/raw)
• קבצים מהאחסון
• URL מהאינטרנט

MediaController:
• פקדי ניגון מובנים
• Play, Pause, Seek
• מוסתר אוטומטית`,
    codeExample: `<!-- XML Layout -->
<VideoView
    android:id="@+id/videoView"
    android:layout_width="match_parent"
    android:layout_height="300dp" />

// Java Code
VideoView videoView = findViewById(R.id.videoView);

// ========================================
// הפעלה מ-res/raw
// ========================================
String videoPath = "android.resource://" + getPackageName() + "/" + R.raw.sample_video;
Uri videoUri = Uri.parse(videoPath);
videoView.setVideoURI(videoUri);

// ========================================
// הפעלה מ-URL
// ========================================
Uri videoUrl = Uri.parse("https://example.com/video.mp4");
videoView.setVideoURI(videoUrl);

// הוספת MediaController (פקדי ניגון)
MediaController mediaController = new MediaController(this);
mediaController.setAnchorView(videoView);
videoView.setMediaController(mediaController);

// Listeners
videoView.setOnPreparedListener(mp -> {
    // הווידאו מוכן
    videoView.start();
    
    // לופ
    mp.setLooping(true);
});

videoView.setOnCompletionListener(mp -> {
    // הסתיים
    Toast.makeText(this, "הסרטון הסתיים", Toast.LENGTH_SHORT).show();
});

videoView.setOnErrorListener((mp, what, extra) -> {
    Toast.makeText(this, "שגיאה בהפעלת הסרטון", 
        Toast.LENGTH_SHORT).show();
    return true;
});

// שליטה ידנית
videoView.start();
videoView.pause();
videoView.resume();
videoView.seekTo(5000); // 5 שניות

// מידע
int duration = videoView.getDuration();
int position = videoView.getCurrentPosition();
boolean isPlaying = videoView.isPlaying();`,
    principles: [
      "Simple Video Playback - הפעלה פשוטה",
      "MediaController - פקדי ניגון",
      "URI Based - מבוסס URI",
      "Lifecycle Aware - מודע למחזור חיים"
    ],
    tips: [
      "השתמש ב-OnPreparedListener לפני start",
      "הוסף MediaController לשליטה",
      "שחרר משאבים ב-onPause",
      "שקול ExoPlayer לפונקציונליות מתקדמת"
    ]
  },
  {
    id: "webview",
    name: "WebView",
    nameEn: "WebView",
    description: "הצגת תוכן אינטרנט בתוך האפליקציה.",
    theory: `WebView מאפשר להציג דפי אינטרנט באפליקציה.

שימושים:
• הצגת תנאי שימוש
• דפי עזרה
• תוכן דינמי
• שילוב אתרים

אבטחה:
• דורש הרשאת INTERNET
• זהירות עם JavaScript
• בדיקת URLs`,
    codeExample: `<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- XML Layout -->
<WebView
    android:id="@+id/webView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />

// Java Code
WebView webView = findViewById(R.id.webView);

// הגדרות בסיסיות
WebSettings settings = webView.getSettings();
settings.setJavaScriptEnabled(true); // זהירות!
settings.setDomStorageEnabled(true);
settings.setLoadWithOverviewMode(true);
settings.setUseWideViewPort(true);

// טעינת URL
webView.loadUrl("https://www.google.com");

// טעינת HTML מקומי
String html = "<html><body><h1>שלום!</h1></body></html>";
webView.loadData(html, "text/html", "UTF-8");

// טעינת קובץ מ-assets
webView.loadUrl("file:///android_asset/help.html");

// פתיחת לינקים ב-WebView (לא בדפדפן)
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
    }
    
    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        // התחלת טעינה
        progressBar.setVisibility(View.VISIBLE);
    }
    
    @Override
    public void onPageFinished(WebView view, String url) {
        // סיום טעינה
        progressBar.setVisibility(View.GONE);
    }
});

// תמיכה בחזרה אחורה
@Override
public void onBackPressed() {
    if (webView.canGoBack()) {
        webView.goBack();
    } else {
        super.onBackPressed();
    }
}

// ניקוי ב-onDestroy
@Override
protected void onDestroy() {
    webView.destroy();
    super.onDestroy();
}`,
    principles: [
      "Web Content Display - הצגת תוכן אינטרנט",
      "WebViewClient - שליטה בניווט",
      "Security - אבטחה (JavaScript)",
      "Back Navigation - ניווט אחורה"
    ],
    tips: [
      "אפשר JavaScript רק אם צריך",
      "השתמש ב-WebViewClient למניעת פתיחה בדפדפן",
      "טפל ב-onBackPressed לניווט",
      "נקה ב-onDestroy"
    ]
  },
  {
    id: "fileio",
    name: "File I/O",
    nameEn: "File Reading & Writing",
    description: "קריאה וכתיבה לקבצים באחסון המכשיר.",
    theory: `אחסון קבצים באנדרואיד:

Internal Storage:
• פרטי לאפליקציה
• נמחק עם הסרת האפליקציה
• לא דורש הרשאות

External Storage:
• נגיש למשתמש
• דורש הרשאות
• נשאר אחרי הסרה`,
    codeExample: `// ========================================
// Internal Storage - כתיבה
// ========================================
private void writeToInternalStorage(String filename, String content) {
    try {
        FileOutputStream fos = openFileOutput(filename, Context.MODE_PRIVATE);
        fos.write(content.getBytes());
        fos.close();
        Toast.makeText(this, "הקובץ נשמר", Toast.LENGTH_SHORT).show();
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// Internal Storage - קריאה
private String readFromInternalStorage(String filename) {
    try {
        FileInputStream fis = openFileInput(filename);
        InputStreamReader isr = new InputStreamReader(fis);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\\n");
        }
        br.close();
        return sb.toString();
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}

// שימוש
writeToInternalStorage("notes.txt", "זוהי הערה ראשונה");
String content = readFromInternalStorage("notes.txt");

// ========================================
// External Storage (דורש הרשאות)
// ========================================
// AndroidManifest.xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

// בדיקת זמינות
private boolean isExternalStorageAvailable() {
    String state = Environment.getExternalStorageState();
    return Environment.MEDIA_MOUNTED.equals(state);
}

// כתיבה ל-External
private void writeToExternalStorage(String filename, String content) {
    if (!isExternalStorageAvailable()) return;
    
    File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
    File file = new File(dir, filename);
    
    try {
        FileWriter writer = new FileWriter(file);
        writer.write(content);
        writer.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// קריאה מ-External
private String readFromExternalStorage(String filename) {
    File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
    File file = new File(dir, filename);
    
    if (!file.exists()) return null;
    
    try {
        BufferedReader br = new BufferedReader(new FileReader(file));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\\n");
        }
        br.close();
        return sb.toString();
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}

// ========================================
// קריאת קובץ מ-assets
// ========================================
private String readFromAssets(String filename) {
    try {
        InputStream is = getAssets().open(filename);
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\\n");
        }
        br.close();
        return sb.toString();
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}`,
    principles: [
      "Internal vs External - פנימי מול חיצוני",
      "Stream Based I/O - קריאה וכתיבה בזרמים",
      "Exception Handling - טיפול בשגיאות",
      "Resource Management - סגירת קבצים"
    ],
    tips: [
      "השתמש ב-try-with-resources לסגירה אוטומטית",
      "בדוק הרשאות לפני גישה לאחסון חיצוני",
      "השתמש ב-getExternalFilesDir לתאימות",
      "אל תשכח לסגור streams"
    ]
  },
  {
    id: "pdf",
    name: "PDF Creation",
    nameEn: "Create PDF",
    description: "יצירת קבצי PDF באפליקציה.",
    theory: `יצירת PDF באנדרואיד:

PdfDocument (מובנה):
• Android 4.4+
• פשוט לשימוש
• ציור על Canvas

iText (ספרייה):
• יותר פונקציונליות
• טבלאות, סגנונות
• דורש תלות`,
    codeExample: `// ========================================
// PdfDocument - מובנה באנדרואיד
// ========================================
private void createPdf() {
    // יצירת מסמך PDF
    PdfDocument document = new PdfDocument();
    
    // הגדרת גודל עמוד (A4)
    PdfDocument.PageInfo pageInfo = new PdfDocument.PageInfo.Builder(
        595, 842, 1).create(); // A4 בפיקסלים
    
    // יצירת עמוד
    PdfDocument.Page page = document.startPage(pageInfo);
    
    // ציור על Canvas
    Canvas canvas = page.getCanvas();
    Paint paint = new Paint();
    
    // כותרת
    paint.setTextSize(24);
    paint.setColor(Color.BLACK);
    canvas.drawText("דוח מכירות", 250, 50, paint);
    
    // קו
    paint.setStrokeWidth(2);
    canvas.drawLine(50, 70, 545, 70, paint);
    
    // תוכן
    paint.setTextSize(14);
    canvas.drawText("תאריך: " + new Date().toString(), 50, 100, paint);
    canvas.drawText("סה\"כ מכירות: ₪15,000", 50, 130, paint);
    
    // טבלה פשוטה
    int y = 180;
    canvas.drawText("מוצר", 50, y, paint);
    canvas.drawText("כמות", 200, y, paint);
    canvas.drawText("מחיר", 350, y, paint);
    
    y += 30;
    canvas.drawText("מוצר א'", 50, y, paint);
    canvas.drawText("10", 200, y, paint);
    canvas.drawText("₪500", 350, y, paint);
    
    // סיום עמוד
    document.finishPage(page);
    
    // שמירת הקובץ
    File dir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
    File file = new File(dir, "report.pdf");
    
    try {
        FileOutputStream fos = new FileOutputStream(file);
        document.writeTo(fos);
        document.close();
        fos.close();
        
        Toast.makeText(this, "PDF נוצר: " + file.getPath(), 
            Toast.LENGTH_LONG).show();
            
        // פתיחת הקובץ
        openPdf(file);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// פתיחת PDF
private void openPdf(File file) {
    Uri uri = FileProvider.getUriForFile(this, 
        getPackageName() + ".provider", file);
    
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setDataAndType(uri, "application/pdf");
    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    
    try {
        startActivity(intent);
    } catch (ActivityNotFoundException e) {
        Toast.makeText(this, "אין אפליקציה לפתיחת PDF", 
            Toast.LENGTH_SHORT).show();
    }
}

// ========================================
// PDF מ-View (צילום מסך לPDF)
// ========================================
private void createPdfFromView(View view) {
    PdfDocument document = new PdfDocument();
    
    int width = view.getWidth();
    int height = view.getHeight();
    
    PdfDocument.PageInfo pageInfo = 
        new PdfDocument.PageInfo.Builder(width, height, 1).create();
    PdfDocument.Page page = document.startPage(pageInfo);
    
    view.draw(page.getCanvas());
    
    document.finishPage(page);
    
    // שמירה...
}`,
    principles: [
      "Canvas Drawing - ציור על Canvas",
      "Page Management - ניהול עמודים",
      "File Output - שמירה לקובץ",
      "FileProvider - שיתוף קבצים"
    ],
    tips: [
      "השתמש בגודל A4 סטנדרטי (595x842)",
      "חשב מיקומים מראש לטבלאות",
      "השתמש ב-FileProvider לשיתוף",
      "טפל בכיוון RTL בעברית"
    ]
  },
  {
    id: "arraylist",
    name: "ArrayList",
    nameEn: "ArrayList & Collections",
    description: "עבודה עם רשימות דינמיות בג'אווה.",
    theory: `ArrayList היא רשימה דינמית שמאפשרת הוספה והסרה בקלות.

יתרונות על מערך רגיל:
• גודל דינמי
• מתודות מובנות
• קל להוספה/הסרה
• עובד עם Generics

מתודות חשובות:
• add() - הוספה
• remove() - הסרה
• get() - קבלה
• size() - גודל
• clear() - ניקוי`,
    codeExample: `// ========================================
// יצירה ושימוש בסיסי
// ========================================
ArrayList<String> names = new ArrayList<>();

// הוספה
names.add("דוד");
names.add("שרה");
names.add("יוסי");

// הוספה במיקום ספציפי
names.add(1, "רחל"); // במיקום 1

// קבלה
String first = names.get(0); // "דוד"

// עדכון
names.set(0, "דני");

// הסרה
names.remove("שרה"); // לפי ערך
names.remove(0); // לפי אינדקס

// גודל
int size = names.size();

// בדיקה
boolean exists = names.contains("יוסי");
int index = names.indexOf("יוסי");

// ניקוי
names.clear();

// ========================================
// ArrayList עם אובייקטים
// ========================================
ArrayList<Product> products = new ArrayList<>();

products.add(new Product("מוצר 1", 99.99));
products.add(new Product("מוצר 2", 149.99));

// מעבר בלולאה
for (Product product : products) {
    Log.d(TAG, product.getName());
}

// מעבר עם אינדקס
for (int i = 0; i < products.size(); i++) {
    Product p = products.get(i);
    Log.d(TAG, i + ": " + p.getName());
}

// ========================================
// פעולות מתקדמות
// ========================================
// מיון
Collections.sort(names); // א-ב

// מיון לפי שדה
products.sort((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()));

// סינון (Java 8+)
ArrayList<Product> expensive = products.stream()
    .filter(p -> p.getPrice() > 100)
    .collect(Collectors.toCollection(ArrayList::new));

// חיפוש
Product found = null;
for (Product p : products) {
    if (p.getId() == searchId) {
        found = p;
        break;
    }
}

// המרה למערך
String[] arr = names.toArray(new String[0]);

// יצירה ממערך
String[] array = {"א", "ב", "ג"};
ArrayList<String> list = new ArrayList<>(Arrays.asList(array));`,
    principles: [
      "Dynamic Size - גודל דינמי",
      "Generics - סוגים גנריים",
      "Index Based - גישה לפי אינדקס",
      "Iteration - מעבר בלולאה"
    ],
    tips: [
      "השתמש ב-Generics לבטיחות סוגים",
      "השתמש ב-for-each לקריאות",
      "היזהר מ-ConcurrentModificationException בלולאה",
      "השתמש ב-Collections.sort למיון"
    ]
  },
  {
    id: "stringparsing",
    name: "String Parsing",
    nameEn: "String Manipulation",
    description: "עיבוד ופירוק מחרוזות בג'אווה.",
    theory: `עבודה עם מחרוזות היא נפוצה מאוד בתכנות.

פעולות נפוצות:
• פיצול (split)
• חיבור (concat)
• חיפוש (contains, indexOf)
• החלפה (replace)
• חיתוך (substring)
• המרה (parseInt, valueOf)`,
    codeExample: `// ========================================
// פעולות בסיסיות
// ========================================
String text = "שלום עולם";

// אורך
int length = text.length(); // 9

// גישה לתו
char firstChar = text.charAt(0); // 'ש'

// חיתוך
String sub = text.substring(0, 4); // "שלום"

// חיפוש
boolean contains = text.contains("עולם"); // true
int index = text.indexOf("עולם"); // 5

// השוואה
boolean equals = text.equals("שלום עולם"); // true
boolean equalsIgnoreCase = text.equalsIgnoreCase("HELLO"); // false

// ========================================
// פיצול וחיבור
// ========================================
String csv = "תפוח,בננה,תפוז";
String[] fruits = csv.split(",");
// ["תפוח", "בננה", "תפוז"]

// חיבור
String joined = String.join(", ", fruits);
// "תפוח, בננה, תפוז"

// StringBuilder לביצועים
StringBuilder sb = new StringBuilder();
for (String fruit : fruits) {
    sb.append(fruit).append(" | ");
}
String result = sb.toString();

// ========================================
// החלפה וניקוי
// ========================================
String dirty = "  שלום עולם  ";

// הסרת רווחים
String trimmed = dirty.trim(); // "שלום עולם"

// החלפה
String replaced = text.replace("עולם", "ישראל");
// "שלום ישראל"

// החלפה עם Regex
String numbers = "abc123def456";
String onlyLetters = numbers.replaceAll("[0-9]", "");
// "abcdef"

// ========================================
// המרות
// ========================================
// String ל-int
String numStr = "123";
int num = Integer.parseInt(numStr);

// String ל-double
String priceStr = "99.99";
double price = Double.parseDouble(priceStr);

// מספר ל-String
int value = 42;
String valueStr = String.valueOf(value);
// או
String valueStr2 = "" + value;

// עיצוב מספרים
double amount = 1234.567;
String formatted = String.format("%.2f", amount); // "1234.57"
String currency = String.format("₪%,.2f", amount); // "₪1,234.57"

// ========================================
// עבודה עם JSON פשוט (ידני)
// ========================================
String json = "{\\"name\\":\\"דוד\\",\\"age\\":25}";

// חילוץ שם (דרך פשוטה)
int nameStart = json.indexOf("\\"name\\":\\"") + 8;
int nameEnd = json.indexOf("\\",\\"age");
String name = json.substring(nameStart, nameEnd);`,
    principles: [
      "Immutable Strings - מחרוזות לא משתנות",
      "StringBuilder - לביצועים בשרשור",
      "Parsing - המרה מ-String לסוגים אחרים",
      "Formatting - עיצוב מחרוזות"
    ],
    tips: [
      "השתמש ב-StringBuilder בלולאות",
      "בדוק null לפני פעולות על String",
      "השתמש ב-try-catch להמרות מספריות",
      "השתמש ב-String.format לעיצוב מורכב"
    ]
  },
  {
    id: "scrollview",
    name: "ScrollView",
    nameEn: "ScrollView",
    description: "רכיב המאפשר גלילה של תוכן ארוך.",
    theory: `ScrollView מאפשר גלילה כאשר התוכן גדול מהמסך.

סוגים:
• ScrollView - גלילה אנכית
• HorizontalScrollView - גלילה אופקית
• NestedScrollView - תמיכה ב-nested scrolling

חשוב:
• ילד אחד בלבד (בדרך כלל LinearLayout)
• לא לשים RecyclerView בתוך ScrollView`,
    codeExample: `<!-- ScrollView אנכי -->
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true">
    
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">
        
        <!-- תוכן ארוך -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="טקסט ארוך מאוד..." />
            
        <Button
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="כפתור בתחתית" />
            
    </LinearLayout>
</ScrollView>

<!-- HorizontalScrollView -->
<HorizontalScrollView
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    
    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">
        
        <Button android:text="1" ... />
        <Button android:text="2" ... />
        <Button android:text="3" ... />
        <!-- עוד כפתורים -->
        
    </LinearLayout>
</HorizontalScrollView>

<!-- NestedScrollView (Material) -->
<androidx.core.widget.NestedScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true">
    
    <LinearLayout ...>
        <!-- תוכן -->
    </LinearLayout>
    
</androidx.core.widget.NestedScrollView>

// Java - גלילה תוכניתית
ScrollView scrollView = findViewById(R.id.scrollView);

// גלילה לתחתית
scrollView.fullScroll(View.FOCUS_DOWN);

// גלילה למעלה
scrollView.fullScroll(View.FOCUS_UP);

// גלילה למיקום ספציפי
scrollView.smoothScrollTo(0, 500);

// האזנה לגלילה
scrollView.setOnScrollChangeListener((v, scrollX, scrollY, oldX, oldY) -> {
    if (scrollY > oldY) {
        Log.d(TAG, "גלילה למטה");
    } else {
        Log.d(TAG, "גלילה למעלה");
    }
});`,
    principles: [
      "Single Child - ילד אחד בלבד",
      "fillViewport - מילוי המסך",
      "Nested Scrolling - גלילה מקוננת",
      "Programmatic Scrolling - גלילה בקוד"
    ],
    tips: [
      "השתמש ב-fillViewport=\"true\" למילוי המסך",
      "הימנע מ-ScrollView בתוך ScrollView",
      "השתמש ב-NestedScrollView עם RecyclerView",
      "הוסף padding לתוכן"
    ]
  },
  {
    id: "localization",
    name: "Localization",
    nameEn: "Localization / i18n",
    description: "תמיכה במספר שפות באפליקציה.",
    theory: `Localization מאפשר להתאים את האפליקציה לשפות שונות.

קבצי משאבים:
• values/strings.xml - ברירת מחדל
• values-iw/strings.xml - עברית
• values-ar/strings.xml - ערבית
• values-en/strings.xml - אנגלית

RTL:
• אנדרואיד תומך ב-RTL אוטומטית
• android:supportsRtl="true"`,
    codeExample: `<!-- res/values/strings.xml (ברירת מחדל - עברית) -->
<resources>
    <string name="app_name">האפליקציה שלי</string>
    <string name="hello">שלום</string>
    <string name="welcome">ברוך הבא, %1$s!</string>
    <string name="items_count">%d פריטים</string>
    
    <string-array name="colors">
        <item>אדום</item>
        <item>ירוק</item>
        <item>כחול</item>
    </string-array>
    
    <plurals name="songs">
        <item quantity="one">שיר אחד</item>
        <item quantity="other">%d שירים</item>
    </plurals>
</resources>

<!-- res/values-en/strings.xml (אנגלית) -->
<resources>
    <string name="app_name">My App</string>
    <string name="hello">Hello</string>
    <string name="welcome">Welcome, %1$s!</string>
    <string name="items_count">%d items</string>
</resources>

// Java - שימוש במחרוזות
// פשוט
String hello = getString(R.string.hello);

// עם פרמטרים
String welcome = getString(R.string.welcome, userName);

// עם מספרים
String items = getString(R.string.items_count, 5);

// Plurals
int count = 3;
String songs = getResources().getQuantityString(R.plurals.songs, count, count);

// ========================================
// שינוי שפה בקוד
// ========================================
private void setLocale(String langCode) {
    Locale locale = new Locale(langCode);
    Locale.setDefault(locale);
    
    Resources res = getResources();
    Configuration config = res.getConfiguration();
    config.setLocale(locale);
    
    res.updateConfiguration(config, res.getDisplayMetrics());
    
    // רענון Activity
    recreate();
}

// שימוש
setLocale("en"); // אנגלית
setLocale("iw"); // עברית
setLocale("ar"); // ערבית

// ========================================
// RTL Support
// ========================================
<!-- AndroidManifest.xml -->
<application
    android:supportsRtl="true"
    ... >

<!-- Layout עם תמיכה ב-RTL -->
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_marginEnd="16dp"
    android:textAlignment="viewStart" />

// בדיקת כיוון
boolean isRtl = getResources().getConfiguration()
    .getLayoutDirection() == View.LAYOUT_DIRECTION_RTL;`,
    principles: [
      "Resource Qualifiers - תיקיות לפי שפה",
      "String Resources - מחרוזות בקבצי XML",
      "RTL Support - תמיכה בכיוון RTL",
      "Plurals - ריבוי"
    ],
    tips: [
      "אל תשתמש ב-hardcoded strings",
      "השתמש ב-Start/End במקום Left/Right",
      "הוסף supportsRtl=\"true\" ל-manifest",
      "בדוק את האפליקציה בשתי השפות"
    ]
  },
  {
    id: "savedinstancestate",
    name: "savedInstanceState",
    nameEn: "Saving Instance State",
    description: "שמירת מצב Activity בעת סיבוב מסך או שינויי קונפיגורציה.",
    theory: `כאשר מסתובב המסך, ה-Activity נהרס ונוצר מחדש.

savedInstanceState מאפשר:
• שמירת נתונים לפני ההריסה
• שחזור נתונים אחרי היצירה

מה נשמר אוטומטית:
• מצב EditText
• מיקום ScrollView
• מצב CheckBox

מה צריך לשמור ידנית:
• משתנים
• מידע מהרשת
• מצב משחק`,
    codeExample: `// ========================================
// שמירה ושחזור בסיסי
// ========================================
public class MainActivity extends AppCompatActivity {
    private int counter = 0;
    private String userName = "";
    
    private static final String KEY_COUNTER = "counter";
    private static final String KEY_USERNAME = "username";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // שחזור נתונים אם קיימים
        if (savedInstanceState != null) {
            counter = savedInstanceState.getInt(KEY_COUNTER, 0);
            userName = savedInstanceState.getString(KEY_USERNAME, "");
            
            // עדכון UI
            tvCounter.setText(String.valueOf(counter));
            tvUserName.setText(userName);
        }
    }
    
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        
        // שמירת נתונים
        outState.putInt(KEY_COUNTER, counter);
        outState.putString(KEY_USERNAME, userName);
    }
}

// ========================================
// שמירת אובייקטים
// ========================================
// האובייקט חייב להיות Serializable או Parcelable
public class Product implements Serializable {
    private String name;
    private double price;
    // ...
}

// שמירה
outState.putSerializable("product", currentProduct);

// שחזור
Product product = (Product) savedInstanceState.getSerializable("product");

// ========================================
// שמירת ArrayList
// ========================================
private ArrayList<String> items = new ArrayList<>();

// שמירה
outState.putStringArrayList("items", items);

// שחזור
items = savedInstanceState.getStringArrayList("items");
if (items == null) {
    items = new ArrayList<>();
}

// ========================================
// שימוש ב-ViewModel (מומלץ)
// ========================================
public class MainViewModel extends ViewModel {
    private int counter = 0;
    private MutableLiveData<String> userName = new MutableLiveData<>();
    
    public int getCounter() { return counter; }
    public void setCounter(int value) { counter = value; }
    
    public LiveData<String> getUserName() { return userName; }
    public void setUserName(String name) { userName.setValue(name); }
}

// ב-Activity
public class MainActivity extends AppCompatActivity {
    private MainViewModel viewModel;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        viewModel = new ViewModelProvider(this).get(MainViewModel.class);
        
        // הנתונים נשמרים אוטומטית!
        tvCounter.setText(String.valueOf(viewModel.getCounter()));
        
        viewModel.getUserName().observe(this, name -> {
            tvUserName.setText(name);
        });
    }
}`,
    principles: [
      "Configuration Changes - שינויי קונפיגורציה",
      "Bundle - העברת נתונים",
      "Lifecycle Aware - מודעות למחזור חיים",
      "ViewModel - אלטרנטיבה מומלצת"
    ],
    tips: [
      "השתמש ב-constants לשמות המפתחות",
      "שקול להשתמש ב-ViewModel במקום",
      "אל תשמור נתונים גדולים מדי ב-Bundle",
      "השתמש ב-Parcelable במקום Serializable לביצועים"
    ]
  },
  {
    id: "autocomplete",
    name: "AutoCompleteTextView",
    nameEn: "AutoComplete",
    description: "שדה טקסט עם השלמה אוטומטית.",
    theory: `AutoCompleteTextView מציע הצעות בזמן הקלדה.

יתרונות:
• חוויית משתמש טובה
• מניעת שגיאות הקלדה
• חיפוש מהיר

וריאציות:
• AutoCompleteTextView - הצעה אחת
• MultiAutoCompleteTextView - מספר בחירות`,
    codeExample: `<!-- XML Layout -->
<AutoCompleteTextView
    android:id="@+id/actvCity"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="הקלד שם עיר"
    android:completionThreshold="1" />

<!-- עם Material Design -->
<com.google.android.material.textfield.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="בחר עיר"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.ExposedDropdownMenu">
    
    <AutoCompleteTextView
        android:id="@+id/actvCity"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="none" />
        
</com.google.android.material.textfield.TextInputLayout>

// Java Code
AutoCompleteTextView actvCity = findViewById(R.id.actvCity);

// מערך הצעות
String[] cities = {"תל אביב", "ירושלים", "חיפה", "באר שבע", "אילת"};

// יצירת Adapter
ArrayAdapter<String> adapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_dropdown_item_1line,
    cities
);

actvCity.setAdapter(adapter);

// האזנה לבחירה
actvCity.setOnItemClickListener((parent, view, position, id) -> {
    String selected = (String) parent.getItemAtPosition(position);
    Toast.makeText(this, "נבחר: " + selected, Toast.LENGTH_SHORT).show();
});

// ========================================
// עם ArrayList דינמי
// ========================================
ArrayList<String> suggestions = new ArrayList<>();
suggestions.add("תל אביב");
suggestions.add("תל מונד");

ArrayAdapter<String> dynamicAdapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_dropdown_item_1line,
    suggestions
);

// הוספת הצעות
suggestions.add("תלפיות");
dynamicAdapter.notifyDataSetChanged();

// ========================================
// MultiAutoCompleteTextView
// ========================================
<MultiAutoCompleteTextView
    android:id="@+id/mactvTags"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="הוסף תגיות (הפרד בפסיק)" />

MultiAutoCompleteTextView mactv = findViewById(R.id.mactvTags);
mactv.setAdapter(adapter);
mactv.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());

// ========================================
// Custom Adapter עם אובייקטים
// ========================================
public class CityAdapter extends ArrayAdapter<City> {
    public CityAdapter(Context context, ArrayList<City> cities) {
        super(context, 0, cities);
    }
    
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext())
                .inflate(R.layout.item_city, parent, false);
        }
        
        City city = getItem(position);
        TextView tvName = convertView.findViewById(R.id.tvName);
        tvName.setText(city.getName());
        
        return convertView;
    }
    
    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                // לוגיקת סינון
            }
            
            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                // עדכון תוצאות
                notifyDataSetChanged();
            }
        };
    }
}`,
    principles: [
      "Suggestions - הצעות בזמן הקלדה",
      "Adapter Based - מבוסס Adapter",
      "Filter - סינון תוצאות",
      "Threshold - סף תווים להתחלה"
    ],
    tips: [
      "הגדר completionThreshold=1 להתחלה מהירה",
      "השתמש ב-setOnItemClickListener לבחירה",
      "שקול Material ExposedDropdownMenu",
      "השתמש ב-Filter לסינון מותאם"
    ]
  },
  {
    id: "textwatcher",
    name: "TextWatcher",
    nameEn: "Text Input Listener",
    description: "האזנה לשינויים בתיבת טקסט בזמן אמת.",
    theory: `TextWatcher מאפשר להאזין לכל שינוי בטקסט.

מתודות:
• beforeTextChanged - לפני השינוי
• onTextChanged - במהלך השינוי
• afterTextChanged - אחרי השינוי

שימושים:
• ולידציה בזמן אמת
• חיפוש מיידי
• עיצוב טקסט
• ספירת תווים`,
    codeExample: `EditText etSearch = findViewById(R.id.etSearch);

etSearch.addTextChangedListener(new TextWatcher() {
    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        // נקרא לפני שהטקסט משתנה
        // s = הטקסט הנוכחי
        // start = מיקום ההתחלה
        // count = מספר תווים שיוסרו
        // after = מספר תווים שיתווספו
    }
    
    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        // נקרא במהלך השינוי
        // מתאים לחיפוש
        performSearch(s.toString());
    }
    
    @Override
    public void afterTextChanged(Editable s) {
        // נקרא אחרי השינוי
        // מתאים לולידציה ועיצוב
        validateInput(s.toString());
    }
});

// ========================================
// דוגמה: ולידציה בזמן אמת
// ========================================
etEmail.addTextChangedListener(new TextWatcher() {
    @Override
    public void afterTextChanged(Editable s) {
        String email = s.toString().trim();
        
        if (email.isEmpty()) {
            tilEmail.setError("שדה חובה");
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.setError("אימייל לא תקין");
        } else {
            tilEmail.setError(null); // תקין
        }
    }
    
    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
    
    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {}
});

// ========================================
// דוגמה: ספירת תווים
// ========================================
etMessage.addTextChangedListener(new TextWatcher() {
    @Override
    public void afterTextChanged(Editable s) {
        int length = s.length();
        int max = 140;
        tvCounter.setText(length + "/" + max);
        
        if (length > max) {
            tvCounter.setTextColor(Color.RED);
        } else {
            tvCounter.setTextColor(Color.GRAY);
        }
    }
    // ...
});

// ========================================
// דוגמה: עיצוב מספר טלפון
// ========================================
etPhone.addTextChangedListener(new TextWatcher() {
    private boolean isFormatting = false;
    
    @Override
    public void afterTextChanged(Editable s) {
        if (isFormatting) return;
        isFormatting = true;
        
        String phone = s.toString().replaceAll("[^0-9]", "");
        StringBuilder formatted = new StringBuilder();
        
        for (int i = 0; i < phone.length(); i++) {
            if (i == 3 || i == 6) {
                formatted.append("-");
            }
            formatted.append(phone.charAt(i));
        }
        
        s.replace(0, s.length(), formatted.toString());
        isFormatting = false;
    }
    // ...
});`,
    principles: [
      "Real-time Monitoring - מעקב בזמן אמת",
      "Three Callbacks - שלוש מתודות",
      "Editable - אפשרות לעריכת הטקסט",
      "Validation - ולידציה מיידית"
    ],
    tips: [
      "השתמש ב-afterTextChanged לולידציה",
      "היזהר מלולאות אינסופיות בעת שינוי הטקסט",
      "השתמש בדגל (flag) למניעת רקורסיה",
      "בחר את המתודה המתאימה לצורך"
    ]
  },
  {
    id: "datetimepicker",
    name: "Date & Time Pickers",
    nameEn: "Date & Time Dialogs",
    description: "תיבות דו-שיח לבחירת תאריך ושעה.",
    theory: `אנדרואיד מספק דיאלוגים מובנים לבחירת תאריך ושעה.

DatePickerDialog:
• בחירת תאריך (יום, חודש, שנה)
• תמיכה בהגבלת טווח

TimePickerDialog:
• בחירת שעה (שעה, דקות)
• תמיכה ב-12/24 שעות`,
    codeExample: `// ========================================
// DatePickerDialog
// ========================================
private void showDatePicker() {
    Calendar calendar = Calendar.getInstance();
    int year = calendar.get(Calendar.YEAR);
    int month = calendar.get(Calendar.MONTH);
    int day = calendar.get(Calendar.DAY_OF_MONTH);
    
    DatePickerDialog dialog = new DatePickerDialog(
        this,
        (view, selectedYear, selectedMonth, selectedDay) -> {
            // selectedMonth הוא 0-based (ינואר = 0)
            String date = selectedDay + "/" + (selectedMonth + 1) + "/" + selectedYear;
            tvDate.setText(date);
            
            // או עם Calendar
            Calendar selected = Calendar.getInstance();
            selected.set(selectedYear, selectedMonth, selectedDay);
            // ...
        },
        year, month, day
    );
    
    // הגבלת תאריכים
    dialog.getDatePicker().setMinDate(System.currentTimeMillis()); // מהיום
    dialog.getDatePicker().setMaxDate(System.currentTimeMillis() + 
        (1000L * 60 * 60 * 24 * 30)); // עד חודש
    
    dialog.show();
}

// ========================================
// TimePickerDialog
// ========================================
private void showTimePicker() {
    Calendar calendar = Calendar.getInstance();
    int hour = calendar.get(Calendar.HOUR_OF_DAY);
    int minute = calendar.get(Calendar.MINUTE);
    
    TimePickerDialog dialog = new TimePickerDialog(
        this,
        (view, selectedHour, selectedMinute) -> {
            String time = String.format("%02d:%02d", selectedHour, selectedMinute);
            tvTime.setText(time);
        },
        hour, minute,
        true // 24 hours format
    );
    
    dialog.show();
}

// ========================================
// שילוב תאריך ושעה
// ========================================
private Calendar selectedDateTime = Calendar.getInstance();

private void showDateTimePicker() {
    // קודם תאריך
    showDatePicker(calendar -> {
        selectedDateTime.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
        selectedDateTime.set(Calendar.MONTH, calendar.get(Calendar.MONTH));
        selectedDateTime.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH));
        
        // אחר כך שעה
        showTimePicker(time -> {
            selectedDateTime.set(Calendar.HOUR_OF_DAY, time.get(Calendar.HOUR_OF_DAY));
            selectedDateTime.set(Calendar.MINUTE, time.get(Calendar.MINUTE));
            
            // עיצוב וה צגה
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
            tvDateTime.setText(sdf.format(selectedDateTime.getTime()));
        });
    });
}

// ========================================
// Material Date Picker
// ========================================
// build.gradle
implementation 'com.google.android.material:material:1.9.0'

// שימוש
MaterialDatePicker<Long> datePicker = MaterialDatePicker.Builder.datePicker()
    .setTitleText("בחר תאריך")
    .setSelection(MaterialDatePicker.todayInUtcMilliseconds())
    .build();

datePicker.addOnPositiveButtonClickListener(selection -> {
    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
    String date = sdf.format(new Date(selection));
    tvDate.setText(date);
});

datePicker.show(getSupportFragmentManager(), "DATE_PICKER");`,
    principles: [
      "Dialog Based - מבוסס דיאלוג",
      "Callback Pattern - החזרת תוצאה",
      "Calendar Object - עבודה עם Calendar",
      "Date Formatting - עיצוב תאריכים"
    ],
    tips: [
      "זכור ש-month הוא 0-based",
      "השתמש ב-SimpleDateFormat לעיצוב",
      "שקול Material Date Picker לעיצוב מודרני",
      "הגדר min/max dates לפי הצורך"
    ]
  },
  {
    id: "fonts",
    name: "Custom Fonts",
    nameEn: "Custom Typography",
    description: "שימוש בפונטים מותאמים אישית באפליקציה.",
    theory: `ניתן להשתמש בפונטים מותאמים באפליקציה.

דרכים:
• קבצים ב-res/font
• Google Fonts (דרך Android Studio)
• Downloadable Fonts

פורמטים נתמכים:
• TTF
• OTF`,
    codeExample: `// ========================================
// שיטה 1: res/font (Android 8.0+)
// ========================================
// 1. צור תיקיית res/font
// 2. הוסף קבצי TTF/OTF
// 3. צור font family (XML)

<!-- res/font/my_font_family.xml -->
<font-family xmlns:android="http://schemas.android.com/apk/res/android">
    <font
        android:fontStyle="normal"
        android:fontWeight="400"
        android:font="@font/my_font_regular" />
    <font
        android:fontStyle="normal"
        android:fontWeight="700"
        android:font="@font/my_font_bold" />
    <font
        android:fontStyle="italic"
        android:fontWeight="400"
        android:font="@font/my_font_italic" />
</font-family>

<!-- שימוש ב-XML -->
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="טקסט עם פונט מותאם"
    android:fontFamily="@font/my_font_family" />

<!-- או בסגנון -->
<style name="AppTheme" parent="Theme.MaterialComponents.Light">
    <item name="android:fontFamily">@font/my_font_family</item>
</style>

// Java Code
Typeface typeface = ResourcesCompat.getFont(this, R.font.my_font_regular);
textView.setTypeface(typeface);

// Bold
textView.setTypeface(typeface, Typeface.BOLD);

// ========================================
// שיטה 2: assets (תאימות לאחור)
// ========================================
// הוסף קובץ ל-assets/fonts/

Typeface typeface = Typeface.createFromAsset(getAssets(), "fonts/my_font.ttf");
textView.setTypeface(typeface);

// ========================================
// שיטה 3: Google Fonts ב-Android Studio
// ========================================
// 1. Layout Editor > TextView > fontFamily
// 2. More Fonts > בחר פונט > OK
// הקבצים יתווספו אוטומטית

// ========================================
// Font Helper class
// ========================================
public class FontHelper {
    private static Typeface regularFont;
    private static Typeface boldFont;
    
    public static Typeface getRegularFont(Context context) {
        if (regularFont == null) {
            regularFont = ResourcesCompat.getFont(context, R.font.my_font_regular);
        }
        return regularFont;
    }
    
    public static void applyFont(TextView textView, Context context) {
        textView.setTypeface(getRegularFont(context));
    }
}`,
    principles: [
      "Resource Fonts - פונטים כמשאבים",
      "Font Family - משפחת פונטים",
      "Typeface Object - אובייקט פונט",
      "Theme Integration - שילוב בתמה"
    ],
    tips: [
      "השתמש ב-res/font לפשטות",
      "הגדר פונט ברירת מחדל ב-Theme",
      "השתמש ב-FontFamily למשקלים שונים",
      "שמור על cache לביצועים"
    ]
  },
  {
    id: "github",
    name: "Git & GitHub",
    nameEn: "Version Control with Git",
    description: "ניהול גרסאות ושיתוף קוד עם Git ו-GitHub.",
    theory: `Git הוא מערכת ניהול גרסאות מבוזרת.
GitHub הוא שירות אחסון לפרויקטים.

פקודות בסיסיות:
• git init - יצירת repo
• git add - הוספה ל-staging
• git commit - שמירת שינויים
• git push - העלאה לשרת
• git pull - הורדה מהשרת

יתרונות:
• גיבוי קוד
• מעקב אחר שינויים
• עבודה בצוות
• תיעוד היסטוריה`,
    codeExample: `# ========================================
# התחלת פרויקט חדש
# ========================================
# יצירת repository מקומי
git init

# הוספת כל הקבצים
git add .

# commit ראשון
git commit -m "Initial commit"

# חיבור ל-GitHub
git remote add origin https://github.com/username/repo.git

# העלאה
git push -u origin main

# ========================================
# זרימת עבודה יומית
# ========================================
# הורדת שינויים אחרונים
git pull

# עבודה על הקוד...

# בדיקת סטטוס
git status

# הוספת שינויים
git add .
# או קבצים ספציפיים
git add MainActivity.java

# commit עם הודעה
git commit -m "Added login functionality"

# העלאה
git push

# ========================================
# עבודה עם Branches
# ========================================
# יצירת branch חדש
git checkout -b feature-login

# מעבר בין branches
git checkout main
git checkout feature-login

# מיזוג branch
git checkout main
git merge feature-login

# מחיקת branch
git branch -d feature-login

# ========================================
# פקודות שימושיות
# ========================================
# צפייה בהיסטוריה
git log
git log --oneline

# ביטול שינויים (לא ב-commit)
git checkout -- filename

# ביטול add
git reset HEAD filename

# ביטול commit אחרון (שמירת שינויים)
git reset --soft HEAD~1

# שכפול פרויקט
git clone https://github.com/username/repo.git

# ========================================
# Android Studio Integration
# ========================================
# VCS > Enable Version Control Integration > Git
# VCS > Share Project on GitHub
# Ctrl+K = Commit
# Ctrl+Shift+K = Push
# Ctrl+T = Pull

# ========================================
# .gitignore לאנדרואיד
# ========================================
# קובץ .gitignore
*.iml
.gradle
/local.properties
/.idea
/build
/captures
.externalNativeBuild
.cxx
*.apk
*.aab`,
    principles: [
      "Version Control - ניהול גרסאות",
      "Distributed System - מערכת מבוזרת",
      "Branching - עבודה עם ענפים",
      "Collaboration - שיתוף פעולה"
    ],
    tips: [
      "עשה commit קטנים ותכופים",
      "כתוב הודעות commit ברורות",
      "השתמש ב-.gitignore מתאים",
      "עבוד עם branches לפיצ'רים",
      "עשה pull לפני push"
    ]
  }
];

export const getComponentById = (id: string): Component | undefined => {
  return components.find(c => c.id === id);
};
