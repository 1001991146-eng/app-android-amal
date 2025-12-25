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
    id: "fragments",
    name: "Fragments",
    nameEn: "Fragments",
    description: "רכיבי UI שניתנים לשימוש חוזר בתוך Activities שונים.",
    theory: `Fragment הוא רכיב UI מודולרי שמייצג חלק ממסך.

יתרונות:
• שימוש חוזר - אותו Fragment במספר Activities
• גמישות - התאמה לגדלי מסך שונים
• ניהול מחזור חיים עצמאי
• תמיכה ב-Back Stack

מחזור חיים:
onAttach → onCreate → onCreateView → onViewCreated → 
onStart → onResume → onPause → onStop → 
onDestroyView → onDestroy → onDetach`,
    codeExample: `// ========================================
// Fragment בסיסי
// ========================================
public class ProductDetailFragment extends Fragment {
    private static final String ARG_PRODUCT_ID = "product_id";
    private int productId;
    
    // יצירת Fragment עם ארגומנטים
    public static ProductDetailFragment newInstance(int productId) {
        ProductDetailFragment fragment = new ProductDetailFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_PRODUCT_ID, productId);
        fragment.setArguments(args);
        return fragment;
    }
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            productId = getArguments().getInt(ARG_PRODUCT_ID);
        }
    }
    
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_product_detail, container, false);
    }
    
    @Override
    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        
        TextView tvName = view.findViewById(R.id.tvName);
        TextView tvPrice = view.findViewById(R.id.tvPrice);
        
        // טעינת נתוני המוצר
        loadProduct(productId);
    }
    
    private void loadProduct(int id) {
        // טעינה מ-DB או API
    }
}

// ========================================
// שימוש ב-Activity
// ========================================
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // הוספת Fragment
        if (savedInstanceState == null) {
            getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.fragment_container, ProductDetailFragment.newInstance(1))
                .commit();
        }
    }
    
    // החלפת Fragment
    public void showProduct(int productId) {
        getSupportFragmentManager()
            .beginTransaction()
            .replace(R.id.fragment_container, ProductDetailFragment.newInstance(productId))
            .addToBackStack(null) // הוספה ל-Back Stack
            .commit();
    }
}`,
    principles: [
      "Modularity - רכיבים עצמאיים וניתנים לשימוש חוזר",
      "Lifecycle Management - ניהול מחזור חיים",
      "Factory Pattern - יצירת Fragments עם newInstance",
      "Back Stack - ניהול ניווט אחורה"
    ],
    tips: [
      "השתמש ב-newInstance עם Bundle להעברת נתונים",
      "הימנע מגישה ל-Views לפני onViewCreated",
      "השתמש ב-ViewModel לשיתוף נתונים בין Fragments",
      "זכור לטפל בשמירת מצב ב-savedInstanceState"
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
  }
];

export const getComponentById = (id: string): Component | undefined => {
  return components.find(c => c.id === id);
};
