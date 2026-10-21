export type Locale = 'ar' | 'en';

const messages = {
  ar: {
    'language.label': 'اللغة',
    'language.ar': 'العربية',
    'language.en': 'English',
    'game.title': 'شطرنج السحرة',
    'game.pageTitle': 'شطرنج السحرة ثلاثي الأبعاد',
    'game.description': 'لعبة شطرنج ثلاثية الأبعاد في كاتدرائية قوطية، بقطع حجرية منحوتة ومؤثرات سينمائية وخصم يعمل بالذكاء الاصطناعي.',
    'loading.summoning': 'جارٍ استحضار تصميم القلعة وقطع الشطرنج المنحوتة...',
    'loading.cathedralArchitecture': 'اكتمل تحميل تصميم الكاتدرائية...',
    'loading.cathedral': 'اكتمل تحميل الكاتدرائية',
    'loading.summonedPiece': 'تم استحضار قطعة الشطرنج: {piece}...',
    'loading.loadedPiece': 'تم تحميل قطعة الشطرنج: {piece}',
    'piece.pawn': 'البيدق',
    'piece.rook': 'القلعة',
    'piece.knight': 'الحصان',
    'piece.bishop': 'الفيل',
    'piece.queen': 'الوزير',
    'piece.king': 'الملك',
    'side.white': 'الأبيض',
    'side.black': 'الأسود',
    'turn.white': 'دور الأبيض',
    'turn.black': 'دور الأسود',
    'turn.check': 'كشّ!',
    'turn.ai': 'الذكاء الاصطناعي...',
    'turn.checkmate': 'كش مات — فاز {winner}',
    'turn.stalemate': 'تعادل — جمود',
    'mode.playingAs': 'تلعب بالقطع {side}',
    'action.playAs': 'العب بالقطع {side}',
    'action.aiMove': 'حرّك الذكاء الاصطناعي',
    'action.newGame': 'لعبة جديدة',
    'action.controls': 'التحكم',
    'action.close': 'إغلاق',
    'action.hideUi': 'إخفاء الواجهة [H]',
    'action.showUi': 'إظهار الواجهة [H]',
    'action.showHud': 'إظهار عناصر التحكم',
    'action.restoreUi': 'إظهار الواجهة',
    'camera.section': 'زوايا الكاميرا',
    'camera.flipHint': 'اضغط على الزاوية النشطة لعكس الاتجاه',
    'camera.player': 'منظور اللاعب',
    'camera.overhead': 'من الأعلى',
    'camera.side': 'جانبي',
    'camera.cathedral': 'الكاتدرائية',
    'display.section': 'العرض والإيماءات',
    'section.gameActions': 'إجراءات اللعبة',
    'hint.touch': 'اللمس: اضغط على قطعة لتحريكها • سحب بإصبع: تدوير • سحب بإصبعين: تحريك • ضمّ/مباعدة: تقريب/إبعاد',
    'hint.controls': 'التحكم: انقر قطعة لتحريكها • سحب بالزر الأيسر: تدوير • سحب بالزر الأيمن: تحريك • عجلة التمرير: تقريب/إبعاد • WASD وR/F: تحريك الكاميرا • H: إخفاء الواجهة',
    'checkmate.ornament': 'حُكم الملاذ',
    'checkmate.title': 'كش مات',
    'checkmate.winner': 'انتصر {winner} • سقط ملك {defeated}',
    'checkmate.replay': 'أعِد سقوط الملك',
    'checkmate.dismiss': 'إغلاق',
    'captured': 'القطع المأخوذة — الأبيض: {white} | الأسود: {black}',
    'tooltip.side': 'التبديل بين اللعب بالأبيض واللعب بالأسود',
    'tooltip.ai': 'اجعل الذكاء الاصطناعي ينفذ نقلته التالية فورًا',
    'tooltip.newGame': 'ابدأ لعبة جديدة على المذبح',
    'tooltip.cameraPlayer': 'منظور اللاعب (انقر مرة أخرى لعكس منظور الأبيض والأسود)',
    'tooltip.cameraOverhead': 'منظور علوي للوحة (انقر مرة أخرى لعكس اتجاه الأبيض والأسود)',
    'tooltip.cameraSide': 'منظور جانبي (انقر مرة أخرى للتبديل بين الشرق والغرب)',
    'tooltip.cameraCathedral': 'منظور واسع للكاتدرائية (انقر مرة أخرى للتبديل بين الشمال والجنوب)',
    'tooltip.hideUi': 'إظهار/إخفاء عناصر الواجهة (الاختصار: H)',
  },
  en: {
    'language.label': 'Language',
    'language.ar': 'العربية',
    'language.en': 'English',
    'game.title': 'Wizard Chess',
    'game.pageTitle': 'Wizard Chess 3D',
    'game.description': 'Interactive 3D Gothic cathedral chess with sculpted stone pieces, cinematic captures, and a single-player AI opponent.',
    'loading.summoning': 'Summoning Sanctum Architecture & Sculpted Pieces...',
    'loading.cathedralArchitecture': 'Cathedral Architecture Loaded...',
    'loading.cathedral': 'Cathedral Loaded',
    'loading.summonedPiece': 'Summoned {piece} Statue...',
    'loading.loadedPiece': 'Loaded {piece}',
    'piece.pawn': 'Pawn',
    'piece.rook': 'Rook',
    'piece.knight': 'Knight',
    'piece.bishop': 'Bishop',
    'piece.queen': 'Queen',
    'piece.king': 'King',
    'side.white': 'White',
    'side.black': 'Black',
    'turn.white': 'White to Move',
    'turn.black': 'Black to Move',
    'turn.check': 'Check!',
    'turn.ai': 'AI...',
    'turn.checkmate': 'Checkmate — {winner} Wins',
    'turn.stalemate': 'Stalemate — Draw',
    'mode.playingAs': 'Playing as {side}',
    'action.playAs': 'Play as {side}',
    'action.aiMove': 'AI Move',
    'action.newGame': 'New Game',
    'action.controls': 'Controls',
    'action.close': 'Close',
    'action.hideUi': 'Hide UI [H]',
    'action.showUi': 'Show UI [H]',
    'action.showHud': 'Show HUD Controls',
    'action.restoreUi': 'Show UI',
    'camera.section': 'Camera Views',
    'camera.flipHint': 'Tap active view to flip',
    'camera.player': 'Player Cam',
    'camera.overhead': 'Overhead',
    'camera.side': 'Side',
    'camera.cathedral': 'Cathedral',
    'display.section': 'Display & Gestures',
    'section.gameActions': 'Game Actions',
    'hint.touch': 'Touch: Tap Piece to Move • 1-Finger Drag: Orbit • 2-Finger Drag: Pan • Pinch: Zoom',
    'hint.controls': 'Controls: Click Piece to Move • Left-Drag: Orbit • Right-Drag: Pan • Scroll: Zoom • WASD + R/F: Fly Cam • H: Hide UI',
    'checkmate.ornament': 'Sanctum Judgment',
    'checkmate.title': 'Checkmate',
    'checkmate.winner': '{winner} Triumphs • The {defeated} King Has Fallen',
    'checkmate.replay': 'Replay King Fall',
    'checkmate.dismiss': 'Dismiss',
    'captured': 'Captured — White: {white} | Black: {black}',
    'tooltip.side': 'Switch between Playing as White and Playing as Black',
    'tooltip.ai': 'Let the AI make the next move immediately',
    'tooltip.newGame': 'Start a fresh game on the altar',
    'tooltip.cameraPlayer': 'Player Camera (Click again to flip White / Black view)',
    'tooltip.cameraOverhead': 'Overhead Board View (Click again to flip White / Black orientation)',
    'tooltip.cameraSide': 'Side Profile View (Click again to switch East / West side)',
    'tooltip.cameraCathedral': 'Wide Cathedral View (Click again to switch North Rose / South Narthex)',
    'tooltip.hideUi': 'Toggle HUD visibility (Shortcut: H)',
  },
} as const;

export type MessageKey = keyof typeof messages.en;

const STORAGE_KEY = 'wizard-chess-language';

export function getLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

export function t(key: MessageKey, values: Record<string, string | number> = {}, locale = getLocale()): string {
  let message: string = messages[locale][key];
  for (const [name, value] of Object.entries(values)) {
    message = message.replaceAll(`{${name}}`, String(value));
  }
  return message;
}

export function setLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // The selected language still applies for this session if storage is unavailable.
  }
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.title = t('game.pageTitle', {}, locale);
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('game.description', {}, locale));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('game.pageTitle', {}, locale));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('game.description', {}, locale));
  window.dispatchEvent(new CustomEvent('wizardchess:localechange', { detail: { locale } }));
}
