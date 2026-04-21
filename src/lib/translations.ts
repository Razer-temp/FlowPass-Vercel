/**
 * FlowPass — Static Translation Dictionary
 *
 * Contains all fixed UI strings used on the BigScreen display,
 * pre-translated into 8 languages. This eliminates API calls
 * for known strings, making translation instant, offline-capable,
 * and 100% reliable.
 *
 * For dynamic content (announcements), use TranslateText component.
 */

type TranslationMap = Record<string, Record<string, string>>;

const TRANSLATIONS: TranslationMap = {
  // ─── Full-Screen State Messages ──────────────────────────
  'ALL ZONES CLEARED': {
    es: 'TODAS LAS ZONAS DESPEJADAS',
    fr: 'TOUTES LES ZONES ÉVACUÉES',
    de: 'ALLE ZONEN GERÄUMT',
    it: 'TUTTE LE ZONE SGOMBERATE',
    ja: '全ゾーン退場完了',
    'zh-CN': '所有区域已清场',
    hi: 'सभी ज़ोन खाली हो गए',
  },
  'Thank you for using FlowPass.': {
    es: 'Gracias por usar FlowPass.',
    fr: 'Merci d\'avoir utilisé FlowPass.',
    de: 'Vielen Dank für die Nutzung von FlowPass.',
    it: 'Grazie per aver utilizzato FlowPass.',
    ja: 'FlowPassをご利用いただきありがとうございました。',
    'zh-CN': '感谢您使用FlowPass。',
    hi: 'FlowPass का उपयोग करने के लिए धन्यवाद।',
  },
  'Everyone has exited safely.': {
    es: 'Todos han salido de forma segura.',
    fr: 'Tout le monde est sorti en toute sécurité.',
    de: 'Alle haben das Gelände sicher verlassen.',
    it: 'Tutti sono usciti in sicurezza.',
    ja: '全員が安全に退場しました。',
    'zh-CN': '所有人已安全退场。',
    hi: 'सभी लोग सुरक्षित रूप से बाहर निकल गए हैं।',
  },

  // ─── Paused State ────────────────────────────────────────
  'ALL EXITS PAUSED': {
    es: 'TODAS LAS SALIDAS PAUSADAS',
    fr: 'TOUTES LES SORTIES EN PAUSE',
    de: 'ALLE AUSGÄNGE PAUSIERT',
    it: 'TUTTE LE USCITE IN PAUSA',
    ja: '全出口一時停止中',
    'zh-CN': '所有出口已暂停',
    hi: 'सभी निकास रुके हुए हैं',
  },
  'Please remain in your seats.': {
    es: 'Por favor, permanezcan en sus asientos.',
    fr: 'Veuillez rester assis.',
    de: 'Bitte bleiben Sie auf Ihren Plätzen.',
    it: 'Si prega di rimanere ai propri posti.',
    ja: 'お席でお待ちください。',
    'zh-CN': '请留在您的座位上。',
    hi: 'कृपया अपनी सीटों पर बने रहें।',
  },
  'Exit will resume shortly.': {
    es: 'La salida se reanudará en breve.',
    fr: 'La sortie reprendra sous peu.',
    de: 'Der Ausgang wird in Kürze fortgesetzt.',
    it: 'L\'uscita riprenderà a breve.',
    ja: '退場はまもなく再開します。',
    'zh-CN': '退场即将恢复。',
    hi: 'निकास शीघ्र ही फिर से शुरू होगा।',
  },
  'Stay calm · Follow instructions · Staff are here to help': {
    es: 'Mantenga la calma · Siga las instrucciones · El personal está aquí para ayudar',
    fr: 'Restez calme · Suivez les instructions · Le personnel est là pour aider',
    de: 'Bleiben Sie ruhig · Folgen Sie den Anweisungen · Personal hilft Ihnen',
    it: 'Mantenete la calma · Seguite le istruzioni · Il personale è qui per aiutare',
    ja: '落ち着いて · 指示に従ってください · スタッフがお手伝いします',
    'zh-CN': '请保持冷静 · 听从指示 · 工作人员随时提供帮助',
    hi: 'शांत रहें · निर्देशों का पालन करें · कर्मचारी मदद के लिए यहाँ हैं',
  },

  // ─── Sidebar Labels ──────────────────────────────────────
  'EXIT ACTIVE': {
    es: 'SALIDA ACTIVA',
    fr: 'SORTIE ACTIVE',
    de: 'AUSGANG AKTIV',
    it: 'USCITA ATTIVA',
    ja: '退場中',
    'zh-CN': '出口开放中',
    hi: 'निकास सक्रिय',
  },
  'Overall Progress': {
    es: 'Progreso General',
    fr: 'Progrès Global',
    de: 'Gesamtfortschritt',
    it: 'Progresso Generale',
    ja: '全体の進捗',
    'zh-CN': '整体进度',
    hi: 'समग्र प्रगति',
  },
  'remain': {
    es: 'restantes',
    fr: 'restants',
    de: 'verbleibend',
    it: 'rimanenti',
    ja: '残り',
    'zh-CN': '剩余',
    hi: 'शेष',
  },
  'cleared': {
    es: 'despejado',
    fr: 'évacué',
    de: 'geräumt',
    it: 'sgomberato',
    ja: '退場済み',
    'zh-CN': '已清场',
    hi: 'खाली हो गया',
  },
  'total': {
    es: 'total',
    fr: 'total',
    de: 'gesamt',
    it: 'totale',
    ja: '合計',
    'zh-CN': '总计',
    hi: 'कुल',
  },
  'exited': {
    es: 'salieron',
    fr: 'sortis',
    de: 'verlassen',
    it: 'usciti',
    ja: '退場済み',
    'zh-CN': '已退场',
    hi: 'बाहर निकले',
  },
  'Scan to get your FlowPass': {
    es: 'Escanea para obtener tu FlowPass',
    fr: 'Scannez pour obtenir votre FlowPass',
    de: 'Scannen Sie für Ihren FlowPass',
    it: 'Scansiona per ottenere il tuo FlowPass',
    ja: 'スキャンしてFlowPassを取得',
    'zh-CN': '扫码获取您的FlowPass',
    hi: 'अपना FlowPass पाने के लिए स्कैन करें',
  },

  // ─── Zone Card Status Strings ────────────────────────────
  '🔴 PLEASE WAIT': {
    es: '🔴 POR FAVOR ESPERE',
    fr: '🔴 VEUILLEZ PATIENTER',
    de: '🔴 BITTE WARTEN',
    it: '🔴 ATTENDERE PREGO',
    ja: '🔴 お待ちください',
    'zh-CN': '🔴 请等待',
    hi: '🔴 कृपया प्रतीक्षा करें',
  },
  '🟢 EXIT NOW': {
    es: '🟢 SALIR AHORA',
    fr: '🟢 SORTIR MAINTENANT',
    de: '🟢 JETZT VERLASSEN',
    it: '🟢 USCIRE ORA',
    ja: '🟢 今すぐ退場',
    'zh-CN': '🟢 立即退场',
    hi: '🟢 अभी बाहर निकलें',
  },
  '⏸ TEMPORARILY PAUSED': {
    es: '⏸ PAUSADO TEMPORALMENTE',
    fr: '⏸ TEMPORAIREMENT EN PAUSE',
    de: '⏸ VORÜBERGEHEND PAUSIERT',
    it: '⏸ TEMPORANEAMENTE IN PAUSA',
    ja: '⏸ 一時停止中',
    'zh-CN': '⏸ 暂时暂停',
    hi: '⏸ अस्थायी रूप से रुका हुआ',
  },
  '✅ ALL EXITED': {
    es: '✅ TODOS SALIERON',
    fr: '✅ TOUS SORTIS',
    de: '✅ ALLE VERLASSEN',
    it: '✅ TUTTI USCITI',
    ja: '✅ 全員退場済み',
    'zh-CN': '✅ 全部已退场',
    hi: '✅ सभी बाहर निकल गए',
  },
  '🟡 WAIT': {
    es: '🟡 ESPERE',
    fr: '🟡 PATIENTEZ',
    de: '🟡 WARTEN',
    it: '🟡 ATTENDERE',
    ja: '🟡 お待ちください',
    'zh-CN': '🟡 请等待',
    hi: '🟡 प्रतीक्षा करें',
  },

  // ─── Zone Card Action Text ───────────────────────────────
  'PROCEED TO GATES': {
    es: 'DIRÍJASE A LAS PUERTAS',
    fr: 'DIRIGEZ-VOUS VERS LES PORTES',
    de: 'GEHEN SIE ZU DEN AUSGÄNGEN',
    it: 'DIRIGERSI VERSO LE USCITE',
    ja: 'ゲートへお進みください',
    'zh-CN': '请前往出口',
    hi: 'गेट की ओर बढ़ें',
  },
  'Cleared at': {
    es: 'Despejado a las',
    fr: 'Évacué à',
    de: 'Geräumt um',
    it: 'Sgomberato alle',
    ja: '退場完了',
    'zh-CN': '清场于',
    hi: 'खाली हुआ',
  },
  'Remain seated.': {
    es: 'Permanezca sentado.',
    fr: 'Restez assis.',
    de: 'Bleiben Sie sitzen.',
    it: 'Rimanere seduti.',
    ja: '着席のままお待ちください。',
    'zh-CN': '请留在座位上。',
    hi: 'बैठे रहें।',
  },
  'Assigned Exits': {
    es: 'Salidas Asignadas',
    fr: 'Sorties Assignées',
    de: 'Zugewiesene Ausgänge',
    it: 'Uscite Assegnate',
    ja: '指定出口',
    'zh-CN': '指定出口',
    hi: 'निर्धारित निकास',
  },

  // ─── Announcement Ticker (fixed fallback) ────────────────
  'Gate': {
    es: 'Puerta',
    fr: 'Porte',
    de: 'Ausgang',
    it: 'Uscita',
    ja: 'ゲート',
    'zh-CN': '出口',
    hi: 'गेट',
  },
  'is currently closed — affected zones please follow staff instructions': {
    es: 'está actualmente cerrada — zonas afectadas sigan las instrucciones del personal',
    fr: 'est actuellement fermée — zones concernées veuillez suivre les instructions du personnel',
    de: 'ist derzeit geschlossen — betroffene Zonen bitte den Anweisungen des Personals folgen',
    it: 'è attualmente chiusa — zone interessate seguire le istruzioni del personale',
    ja: 'は現在閉鎖中 — 該当ゾーンの方はスタッフの指示に従ってください',
    'zh-CN': '目前已关闭 — 受影响区域请听从工作人员指示',
    hi: 'वर्तमान में बंद है — प्रभावित क्षेत्र कृपया कर्मचारियों के निर्देशों का पालन करें',
  },
  'Please follow your FlowPass instructions and exit via your assigned gate': {
    es: 'Siga las instrucciones de su FlowPass y salga por la puerta asignada',
    fr: 'Veuillez suivre les instructions de votre FlowPass et sortir par la porte assignée',
    de: 'Bitte folgen Sie den FlowPass-Anweisungen und verlassen Sie das Gelände über Ihren zugewiesenen Ausgang',
    it: 'Seguire le istruzioni del FlowPass e uscire dall\'uscita assegnata',
    ja: 'FlowPassの指示に従い、指定されたゲートから退場してください',
    'zh-CN': '请按照FlowPass指示从指定出口退场',
    hi: 'कृपया अपने FlowPass के निर्देशों का पालन करें और अपने निर्धारित गेट से बाहर निकलें',
  },
};

/**
 * Returns a translation lookup function for the given language code.
 * Usage:
 *   const t = useStaticTranslation('es');
 *   t('EXIT ACTIVE')  // → "SALIDA ACTIVA"
 *
 * Falls back to the original English key if no translation exists.
 */
export function getTranslator(lang: string): (key: string) => string {
  if (!lang || lang === 'en') return (key: string) => key;

  return (key: string) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] || key;
  };
}

export default TRANSLATIONS;
