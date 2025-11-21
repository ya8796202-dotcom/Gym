const content = {
  fitness: `
    <h3>🏃‍♂️ تمارين فتنس</h3>
    <ul>
      <li>تمارين كارديو يومية (20-30 دقيقة)</li>
      <li>تمارين HIIT مرتين أسبوعيًا</li>
      <li>تمارين مرونة وتمدد</li>
    </ul>
  `,
  weights: `
    <h3>🏋️‍♂️ تمارين حديد</h3>
    <ul>
      <li>اليوم 1: صدر وتراي</li>
      <li>اليوم 2: ظهر وباي</li>
      <li>اليوم 3: أرجل وكتف</li>
    </ul>
  `,
  bulking: `
    <h3>🍗 خطة تضخيم</h3>
    <ul>
      <li>سعرات حرارية أعلى من الاحتياج اليومي</li>
      <li>وجبات غنية بالبروتين والكربوهيدرات</li>
      <li>مكملات: واي بروتين، كرياتين</li>
    </ul>
  `,
  cutting: `
    <h3>🥗 خطة تنشيف</h3>
    <ul>
      <li>سعرات أقل من الاحتياج اليومي</li>
      <li>تمارين كارديو يومية</li>
      <li>تقليل الكربوهيدرات وزيادة البروتين</li>
    </ul>
  `
};

function showContent(type) {
  const section = document.getElementById("content");
  section.innerHTML = content[type];
  section.classList.add("fade-in");
}
