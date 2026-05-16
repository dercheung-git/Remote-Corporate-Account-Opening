/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Fingerprint, 
  ScanFace, 
  ChevronRight, 
  ChevronLeft, 
  Camera as CameraIcon, 
  CheckCircle2, 
  FileText, 
  X,
  User,
  Building,
  MapPin,
  Users,
  PenTool,
  ChevronDown,
  Smile,
  Landmark
} from 'lucide-react';
import { translations } from './i18n';

// --- Shared Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-red-700 text-white shadow-lg shadow-red-700/30 hover:bg-red-800",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-red-700 text-red-700 hover:bg-red-50"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Page Components ---

const Page1Login = ({ onNext, username, setUsername, lang, setLang, t }: any) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langs = ['EN', '繁體中文', '简体中文'];

  const handleNext = () => {
    const newErrors = { username: username.trim() === '', password: password.trim() === '' };
    setErrors(newErrors);
    if (!newErrors.username && !newErrors.password) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-5 overflow-y-auto">
      <div className="flex justify-end pt-2 gap-2 relative z-50 shrink-0">
        <button 
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-1.5 font-medium px-4 py-2 rounded-full text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Globe size={16} />
          {lang}
          <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
        </button>
        
        {showLangMenu && (
          <div className="absolute top-14 right-0 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden flex flex-col min-w-[140px] py-1">
            {langs.map((l: string) => (
              <button 
                key={l}
                className={`text-left px-4 py-2.5 text-sm transition-colors w-full ${lang === l ? 'bg-red-50 text-red-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => { setLang(l); setShowLangMenu(false); }}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center flex-1 space-y-5 py-4 shrink-0">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-700 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-red-700/40 shrink-0">
            <Landmark className="text-white" size={28} />
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-black tracking-tight">{t("login_title")}</h1>
          <p className="text-black font-medium text-sm sm:text-base">{t("login_subtitle")}</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <div>
            <input 
              type="text" 
              placeholder={t("login_name")} 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors(errs => ({...errs, username: false})); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 transition-all text-base ${errors.username ? 'border-red-500 bg-red-50 placeholder-red-300 text-black' : 'border-gray-200 bg-gray-50 focus:border-red-700 text-black placeholder-gray-400'}`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1 font-medium px-1">{t("error_login_name")}</p>}
          </div>
          <div>
            <input 
              type="password" 
              placeholder={t("login_password")}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(errs => ({...errs, password: false})); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 transition-all text-base ${errors.password ? 'border-red-500 bg-red-50 placeholder-red-300 text-black' : 'border-gray-200 bg-gray-50 focus:border-red-700 text-black placeholder-gray-400'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1.5 font-medium px-1">{t("error_login_password")}</p>}
          </div>
        </div>

        <div className="flex justify-center gap-6 text-red-700 shrink-0">
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-full hover:bg-red-50 transition-colors">
            <ScanFace size={32} strokeWidth={1.5} />
            <span className="text-[11px] font-semibold">Face ID</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-full hover:bg-red-50 transition-colors">
            <Fingerprint size={32} strokeWidth={1.5} />
            <span className="text-[11px] font-semibold">{t("fingerprint")}</span>
          </button>
        </div>
      </div>

      <div className="pb-4 pt-2 shrink-0 w-full max-w-[280px] mx-auto mt-auto">
        <Button onClick={handleNext} className="!py-3 !text-base">
          {t("login_btn")} <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

const Page2BasicInfo = ({ onNext, onPrev, formData, setFormData, username, t }: any) => {
  const [errors, setErrors] = useState({
    companyType: false,
    location: false,
    shareholders: false,
    signers: false
  });

  const handleProceed = () => {
    const sValue = parseInt(formData.shareholders);
    const signValue = parseInt(formData.signers);
    const newErrors = {
      companyType: !formData.companyType,
      location: !formData.location,
      shareholders: !formData.shareholders.toString().trim() || isNaN(sValue) || sValue < 1,
      signers: !formData.signers.toString().trim() || isNaN(signValue) || signValue < 1
    };
    setErrors(newErrors);
    if (!newErrors.companyType && !newErrors.location && !newErrors.shareholders && !newErrors.signers) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white px-5 py-3 shadow-sm flex justify-between items-center z-10 sticky top-0 shrink-0">
        <h2 className="text-xl font-bold text-gray-800">{t("basic_info")}</h2>
        <div className="flex items-center gap-2 bg-red-50 text-red-800 px-3 py-1.5 rounded-full text-sm font-semibold">
          <User size={16} />
          {username || t("customer")}
        </div>
      </div>

      <div className="flex-1 shrink-0 p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-600 block">{t("company_type")} <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              value={formData.companyType} 
              onChange={e => { setFormData({ ...formData, companyType: e.target.value }); setErrors(errs => ({...errs, companyType: false})); }} 
              className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-red-700 appearance-none shadow-sm pr-10 focus:outline-none text-sm ${formData.companyType ? 'text-black' : 'text-gray-400'} ${errors.companyType ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
            >
              <option value="" disabled hidden>{t("please_select")}</option>
              <option value={t("limited_company")} className="text-black">{t("limited_company")}</option>
              <option value={t("sole_proprietorship")} className="text-black">{t("sole_proprietorship")}</option>
              <option value={t("partnership")} className="text-black">{t("partnership")}</option>
              <option value={t("association")} className="text-black">{t("association")}</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
          {errors.companyType && <p className="text-red-500 text-sm mt-1.5 font-medium px-1">{t("error_company_type")}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-600 block">{t("location")} <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              value={formData.location} 
              onChange={e => { setFormData({ ...formData, location: e.target.value }); setErrors(errs => ({...errs, location: false})); }} 
              className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-red-700 appearance-none shadow-sm pr-10 focus:outline-none text-sm ${formData.location ? 'text-black' : 'text-gray-400'} ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
            >
              <option value="" disabled hidden>{t("please_select")}</option>
              <option value={t("hong_kong")} className="text-black">{t("hong_kong")}</option>
              <option value={t("china")} className="text-black">{t("china")}</option>
              <option value={t("other")} className="text-black">{t("other")}</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
          {errors.location && <p className="text-red-500 text-sm mt-1.5 font-medium px-1">{t("error_location")}</p>}
        </div>

        <div className="flex gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-semibold text-gray-600 block">{t("shareholders")} <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              placeholder={t("please_enter")} 
              min="1"
              value={formData.shareholders} 
              onChange={e => { setFormData({ ...formData, shareholders: e.target.value }); setErrors(errs => ({...errs, shareholders: false})); }} 
              className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 shadow-sm text-sm ${errors.shareholders ? 'border-red-500 bg-red-50 placeholder-red-300 text-black' : 'border-gray-200 focus:border-red-700 text-black placeholder-gray-400'}`} 
            />
            {errors.shareholders && <p className="text-red-500 text-sm mt-1.5 font-medium px-1">{!formData.shareholders.toString().trim() ? t("error_number") : t("error_min_1")}</p>}
          </div>
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-semibold text-gray-600 block">{t("signers")} <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              placeholder={t("please_enter")} 
              min="1"
              value={formData.signers} 
              onChange={e => { setFormData({ ...formData, signers: e.target.value }); setErrors(errs => ({...errs, signers: false})); }} 
              className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 shadow-sm text-sm ${errors.signers ? 'border-red-500 bg-red-50 placeholder-red-300 text-black' : 'border-gray-200 focus:border-red-700 text-black placeholder-gray-400'}`} 
            />
            {errors.signers && <p className="text-red-500 text-sm mt-1.5 font-medium px-1">{!formData.signers.toString().trim() ? t("error_number") : t("error_min_1")}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-600 block">{t("referrer")}</label>
          <input 
            type="text" 
            placeholder={t("optional")} 
            value={formData.referrer} 
            onChange={e => setFormData({ ...formData, referrer: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 shadow-sm text-sm" 
          />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-4 shrink-0 mt-auto">
        <Button variant="secondary" onClick={onPrev} className="w-1/3">{t("cancel")}</Button>
        <Button variant="primary" onClick={handleProceed} className="w-2/3">{t("next_step")} <ChevronRight size={20} /></Button>
      </div>
    </div>
  );
};

const Page3Checklist = ({ onNext, onPrev, formData, t }: any) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white px-5 py-3 shadow-sm sticky top-0 z-10 shrink-0">
        <h2 className="text-xl font-bold text-gray-800">{t("doc_list_title")}</h2>
      </div>

      <div className="flex-1 shrink-0 p-5 space-y-5">
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
          <p className="text-sm text-red-800 mb-2 font-medium">{t("based_on_options")}</p>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-red-900">
            <span className="bg-white px-2 py-1 rounded-md shadow-sm text-xs">{formData.companyType || t("not_set")}</span>
            <span className="bg-white px-2 py-1 rounded-md shadow-sm text-xs">{formData.location || t("not_set")}</span>
            <span className="bg-white px-2 py-1 rounded-md shadow-sm text-xs">{formData.shareholders || "0"} {t("shareholders_count")}</span>
            <span className="bg-white px-2 py-1 rounded-md shadow-sm text-xs">{formData.signers || "0"} {t("signers_count")}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-red-700" size={20} />
            {t("prepare_original_docs")}
          </h3>
          <ul className="space-y-3">
            {[
              t("br"),
              t("ci"),
              t("nnc1"),
              t("ma"),
              `${formData.shareholders || "0"} ${t("hkid_shareholder")}`,
              `${formData.signers || "0"} ${t("hkid_signer")}`
            ].map((doc, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">{i+1}</div>
                <span className="text-gray-700 font-medium leading-tight pt-0.5 text-sm">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 space-y-3 shrink-0 mt-auto">
        <p className="text-center font-bold text-lg text-gray-800">{t("ready_to_capture")}</p>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onPrev} className="w-1/3">{t("cancel")}</Button>
          <Button variant="primary" onClick={onNext} className="w-2/3">{t("next_step")} <ChevronRight size={20} /></Button>
        </div>
      </div>
    </div>
  );
};

const Page4Camera = ({ onNext, onPrev, t }: any) => {
  const [photos, setPhotos] = useState<number>(0);
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Real camera ref for desktop simulation
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    // Attempt to start camera for desktop prototype feel
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setHasCamera(true);
          }
        })
        .catch(err => {
          console.log("Camera access denied or unavailable, using fallback UI.", err);
          setHasCamera(false);
        });
    }
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
         tracks.forEach(t => t.stop());
      }
    }
  }, []);

  const handleCapture = () => {
    setPhotos(p => p + 1);
    setShowPrompt(true);
  };

  const handleNextPhoto = () => {
    setShowPrompt(false);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="p-4 flex justify-between items-center z-20 text-white relative">
        <button onClick={onPrev} className="p-2"><ChevronLeft size={28} /></button>
        <div className="font-medium bg-black/50 px-3 py-1 rounded-full text-sm">{t("captured")} {photos} {t("docs_count")}</div>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Native Mobile Camera Input Element (Hidden, triggered via label mostly, but here we place it overlapping) */}
        {!hasCamera && (
           <label className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden"
                onChange={handleCapture}
              />
              <div className="w-2/3 h-2/3 border-2 border-dashed border-white/50 rounded-xl relative flex items-center justify-center group hover:border-red-500 transition-colors">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white opacity-80" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white opacity-80" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white opacity-80" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white opacity-80" />
                
                <div className="text-white/80 font-medium flex flex-col items-center gap-4 text-center px-4">
                  <CameraIcon size={48} className="group-hover:text-red-500 transition-colors"/>
                  <span className="text-lg whitespace-pre-wrap">{t("click_to_capture")}</span>
                </div>
              </div>
           </label>
        )}

        {/* Video stream for Desktop simulation */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover ${hasCamera ? 'block' : 'hidden'}`}
        />
        {hasCamera && (
           <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
             <div className="w-4/5 h-2/3 relative">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-white/80" />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-white/80" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-white/80" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-white/80" />
             </div>
           </div>
        )}
      </div>

      <div className="h-32 bg-black flex items-center justify-center relative z-20 pb-4">
        {hasCamera && !showPrompt && (
          <button 
             onClick={handleCapture}
             className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 active:scale-95 transition-transform"
          >
             <div className="w-full h-full border-2 border-black rounded-full" />
          </button>
        )}
      </div>

      {/* Completion Prompt Modal */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl z-50 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 text-green-600 font-bold text-xl mb-2">
              <CheckCircle2 size={28} />
              {t("capture_success")}
            </div>
            <p className="text-gray-600 font-medium">{t("capture_success_desc")}</p>
            <div className="flex gap-4 mt-2">
              <Button variant="secondary" onClick={handleNextPhoto} className="w-1/2 text-sm">{t("capture_next")}</Button>
              <Button variant="primary" onClick={onNext} className="w-1/2 text-sm">{t("capture_finish")}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const Page5Review = ({ onNext, onPrev, t }: any) => {
  const [modalType, setModalType] = useState<string | null>(null);

  const Modal = ({ src, onClose, title }: any) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl overflow-hidden max-w-sm w-full" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-red-700 bg-gray-200 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-4 flex justify-center">
          {/* Simulated images using simple HTML art for prototype given lack of assets */}
          {modalType === 'BR' ? (
            <div className="w-full aspect-[4/3] bg-amber-50 border-8 border-gray-200 p-4 font-serif text-center flex flex-col justify-center shadow-inner text-amber-900 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[100px] pointer-events-none rotate-45 select-none text-amber-600">{t("sample")}</div>
              <h4 className="font-bold border-b border-amber-900/20 pb-2 mb-2 text-sm">{t("br_cert")}</h4>
              <p className="text-xs">ABC Company</p>
              <p className="text-xs font-mono mt-2">{t("br_number")}: BR12345678</p>
            </div>
          ) : (
            <div className="w-full aspect-[1.6] bg-[#f0f4f8] rounded-xl border border-gray-300 p-4 shadow-sm relative overflow-hidden flex">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
               <div className="w-1/3 flex flex-col items-center gap-2 border-r border-gray-300/50 pr-2">
                 <div className="w-full aspect-[3/4] bg-gray-200 rounded text-gray-400 flex items-center justify-center mt-2 shadow-sm"><User size={32}/></div>
                 <div className="w-3/4 h-1 bg-red-700 mt-auto rounded-full"></div>
               </div>
               <div className="w-2/3 pl-3 pt-2 text-[10px] space-y-1.5 flex flex-col text-gray-800">
                  <div className="font-bold text-xs">{t("hkid")}</div>
                  <div className="flex justify-between"><span>{t("name_label")}</span><span className="font-bold text-[11px]">CHAN, TAI MAN</span></div>
                  <div className="flex justify-between"><span>{t("dob_label")}</span><span className="font-bold">01-01-1980</span></div>
                  <div className="mt-auto self-end font-mono text-sm tracking-widest font-bold">A123456(7)</div>
               </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800 overflow-y-auto">
      <div className="bg-white px-5 py-3 shadow-sm sticky top-0 z-10 flex justify-between items-end border-b border-red-100 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t("review_title")}</h2>
          <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> {t("ai_completed")}</p>
        </div>
        <div className="text-xs text-gray-500 font-mono text-right">
          {t("ref_number")}<br/>
          <span className="font-bold text-gray-800">#BXXXXXXX-12345</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Company Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-red-800 font-bold mb-3 border-b border-gray-100 pb-2">
            <Building size={18} /> {t("company_basic_info")}
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5 text-xs">{t("company_name")}</p>
              <p className="font-bold text-base">ABC Company</p>
            </div>
            
            <div className="flex items-end justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <div>
                <p className="text-gray-500 mb-0.5 text-xs">{t("br_number")}</p>
                <p className="font-mono font-bold text-sm">BR12345678</p>
              </div>
              <button 
                onClick={() => setModalType('BR')}
                className="text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1">
                {t("view_image")}
              </button>
            </div>

            <div>
              <p className="text-gray-500 mb-0.5 text-xs">{t("place_of_incorporation")}</p>
              <p className="font-bold">{t("hong_kong")}</p>
            </div>
          </div>
        </div>

        {/* Shareholders Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-red-800 font-bold mb-3 border-b border-gray-100 pb-2">
            <Users size={18} /> {t("shareholders_info")}
          </div>
          
          <div className="space-y-2">
            {[
              { name: "Chan Tai Man", hkid: "A123456(7)", dob: "1980/1/1" },
              { name: "Chan Siu Man", hkid: "B987652(2)", dob: "1988/1/1" }
            ].map((person, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <div className="space-y-1">
                  <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                  <p className="text-[10px] text-gray-500 font-mono">{person.hkid} • {person.dob}</p>
                </div>
                <button 
                  onClick={() => setModalType('HKID')}
                  className="text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors whitespace-nowrap">
                  {t("view_id")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-4 shrink-0 mt-auto">
        <Button variant="secondary" onClick={onPrev} className="w-1/3">{t("cancel")}</Button>
        <Button variant="primary" onClick={onNext} className="w-2/3">{t("next_step")} <ChevronRight size={20} /></Button>
      </div>

      <AnimatePresence>
        {modalType && <Modal title={modalType === 'BR' ? t("br_cert") : t("hkid")} onClose={() => setModalType(null)} />}
      </AnimatePresence>
    </div>
  );
};


const SignaturePad = ({ title, onCanvasChange, hasError, t }: { title: string, onCanvasChange: (hasDrawn: boolean) => void, hasError?: boolean, t: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Scale for high DPI displays
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Simple sizing trick tailored to the container dimensions in CSS
    const resizeObj = new ResizeObserver(() => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if(rect) {
         canvas.width = rect.width * 2;
         canvas.height = rect.height * 2;
         ctx.scale(2, 2);
         ctx.lineCap = 'round';
         ctx.lineJoin = 'round';
         ctx.lineWidth = 3;
         ctx.strokeStyle = '#0f172a'; // Slate 900
      }
    });

    if (canvas.parentElement) {
      resizeObj.observe(canvas.parentElement);
    }
    
    return () => resizeObj.disconnect();
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: any) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      if (!hasDrawn) {
         setHasDrawn(true);
         onCanvasChange(true);
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      onCanvasChange(false);
    }
  };

  return (
    <div className={`bg-white p-4 rounded-2xl shadow-sm border transition-colors ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-bold text-gray-800">{title}</label>
        <button 
           onClick={clear} 
           disabled={!hasDrawn}
           className={`text-xs font-medium px-2 py-1 rounded transition-colors ${hasDrawn ? 'text-gray-500 hover:text-red-700 bg-gray-100' : 'text-gray-300 bg-gray-50/50 cursor-not-allowed'}`}
        >
          {t("clear_sign")}
        </button>
      </div>
      <div className={`w-full h-40 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-gray-50 rounded-xl relative border-2 border-dashed ${hasError ? 'border-red-300' : 'border-gray-300'} overflow-hidden touch-none`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
        <div className={`absolute flex items-center gap-2 bottom-3 right-4 p-2 pointer-events-none ${hasDrawn ? 'opacity-0' : 'opacity-20'} transition-opacity`}>
           <PenTool size={20} /> <span className="font-serif">{t("sign_here")}</span>
        </div>
      </div>
    </div>
  );
};


const Page6Signature = ({ onNext, onPrev, t }: any) => {
  const [signed1, setSigned1] = useState(false);
  const [signed2, setSigned2] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleProceed = () => {
    if (!signed1 || !signed2) {
      setErrors(true);
      return;
    }
    setErrors(false);
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white px-5 py-3 shadow-sm sticky top-0 z-10 border-b border-red-100 shrink-0">
        <h2 className="text-xl font-bold text-gray-900">{t("signer_title")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("signer_desc")}</p>
      </div>

      <div className="flex-1 shrink-0 p-4 space-y-6">
        <div className="space-y-1">
          <SignaturePad t={t} title={`${t("signer_1")} (Chan Tai Man)`} onCanvasChange={(status) => { setSigned1(status); if(status) setErrors(false); }} hasError={errors && !signed1} />
          {errors && !signed1 && <p className="text-red-500 text-sm mt-1 font-medium px-1">{t("error_signer")}</p>}
        </div>
        <div className="space-y-1">
          <SignaturePad t={t} title={`${t("signer_2")} (Chan Siu Man)`} onCanvasChange={(status) => { setSigned2(status); if(status) setErrors(false); }} hasError={errors && !signed2} />
          {errors && !signed2 && <p className="text-red-500 text-sm mt-1 font-medium px-1">{t("error_signer")}</p>}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-4 shrink-0 mt-auto">
        <Button variant="secondary" onClick={onPrev} className="w-1/3">{t("cancel")}</Button>
        <Button variant="primary" onClick={handleProceed} className="w-2/3">{t("next_step")} <ChevronRight size={20} /></Button>
      </div>
    </div>
  );
};


const Page7Success = ({ onFinish, t }: any) => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-orange-500 to-red-600 text-white items-center justify-center p-6 text-center space-y-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-800 rounded-full blur-3xl opacity-40 transform -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Animated Bank Staff Icon */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div 
           animate={{ 
              y: [0, -10, 0],
           }}
           transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
           }}
           className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40 mb-2 backdrop-blur-sm shadow-xl"
        >
          <Smile size={50} className="text-white" strokeWidth={2} />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-500 shadow-2xl mt-[-20px]"
      >
        <CheckCircle2 size={50} strokeWidth={3} />
      </motion.div>
      
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.8 }}
         className="relative z-10 space-y-4 max-w-sm"
      >
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">{t("success_title")}</h1>
        <p className="text-white/90 text-lg leading-relaxed font-medium drop-shadow-sm whitespace-pre-wrap">{t("success_desc")}</p>
      </motion.div>

      <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1 }}
         className="relative z-10 w-full max-w-sm pt-8"
      >
        <button 
          onClick={onFinish}
          className="w-full py-4 rounded-xl font-bold text-lg bg-white text-orange-600 shadow-xl hover:bg-gray-50 active:scale-95 transition-all text-center block"
        >
          {t("back_home")}
        </button>
      </motion.div>
    </div>
  );
};


// --- Main App Shell ---

export default function App() {
  const [lang, setLang] = useState('繁體中文');
  const t = (key: string) => translations[lang]?.[key] || key;

  useEffect(() => {
    document.documentElement.lang = lang === '简体中文' ? 'zh-CN' : lang === 'EN' ? 'en' : 'zh-HK';
  }, [lang]);

  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    companyType: '',
    location: '',
    shareholders: '',
    signers: '',
    referrer: ''
  });

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const reset = () => setStep(1);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      boxShadow: "0px 0px 50px rgba(0,0,0,0.2)"
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      boxShadow: "0px 0px 50px rgba(0,0,0,0.2)"
    }),
  };

  // We use previous step to determine slide direction
  const prevStepRef = useRef(step);
  const direction = step > prevStepRef.current ? 1 : -1;
  useEffect(() => {
    prevStepRef.current = step;
  }, [step]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center font-sans overflow-hidden">
      
      {/* Phone frame simulation for Desktop, full screen on Mobile */}
      <div className="relative w-full h-full sm:w-[414px] sm:h-[896px] sm:max-h-[95vh] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col sm:border-[12px] border-black">
        
        {/* Fake Phone Notch - Desktop only visually */}
        <div className="hidden sm:block absolute top-0 inset-x-0 h-6 z-50 pointer-events-none">
          <div className="w-40 h-6 bg-black rounded-b-3xl mx-auto flex gap-4 items-center justify-center pt-2">
             <div className="w-2 h-2 rounded-full bg-gray-800"></div>
             <div className="w-12 h-2 rounded-full bg-gray-800"></div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden sm:pt-6"> {/* Padding for notch spacer */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              {step === 1 && <Page1Login onNext={nextStep} username={username} setUsername={setUsername} lang={lang} setLang={setLang} t={t} />}
              {step === 2 && <Page2BasicInfo onNext={nextStep} onPrev={prevStep} formData={formData} setFormData={setFormData} username={username} t={t} />}
              {step === 3 && <Page3Checklist onNext={nextStep} onPrev={prevStep} formData={formData} t={t} />}
              {step === 4 && <Page4Camera onNext={nextStep} onPrev={prevStep} t={t} />}
              {step === 5 && <Page5Review onNext={nextStep} onPrev={prevStep} t={t} />}
              {step === 6 && <Page6Signature onNext={nextStep} onPrev={prevStep} t={t} />}
              {step === 7 && <Page7Success onFinish={reset} t={t} />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Fake Home Indicator for iPhone feel */}
        <div className="hidden sm:block w-full h-8 bg-black/5 absolute bottom-0 z-50 pointer-events-none flex items-end justify-center pb-2">
          <div className="w-32 h-1 bg-black/30 rounded-full"></div>
        </div>
      </div>

    </div>
  );
}

