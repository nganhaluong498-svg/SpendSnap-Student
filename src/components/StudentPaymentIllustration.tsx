import { ReceiptText, Sparkles, Wallet } from "lucide-react";

export function StudentPaymentIllustration() {
  return (
    <div aria-hidden="true" className="relative z-10 h-[270px] w-full max-w-[500px]">
      <div className="absolute left-7 top-7 z-20 grid h-12 w-12 rotate-[-8deg] place-items-center rounded-[18px] border border-white bg-white/90 text-momo-primary shadow-[0_14px_30px_rgba(229,0,126,0.12)]">
        <Wallet className="h-5 w-5" />
      </div>
      <div className="absolute right-7 top-9 z-20 grid h-12 w-12 rotate-[8deg] place-items-center rounded-[18px] border border-white bg-white/90 text-momo-primary shadow-[0_14px_30px_rgba(229,0,126,0.12)]">
        <ReceiptText className="h-5 w-5" />
      </div>
      <div className="absolute bottom-12 right-[34%] z-20 grid h-12 w-12 rotate-[-5deg] place-items-center rounded-[18px] border border-white bg-white/90 shadow-[0_14px_30px_rgba(124,58,237,0.12)]">
        <div className="space-y-0.5">
          <div className="h-2.5 w-7 rounded-full border border-momo-primary/40 bg-momo-soft" />
          <div className="h-2.5 w-7 rounded-full border border-momo-primary/40 bg-white" />
          <div className="h-2.5 w-7 rounded-full border border-momo-primary/40 bg-momo-soft" />
        </div>
      </div>
      <Sparkles className="absolute left-[36%] top-8 z-20 h-5 w-5 text-momo-violet" />
      <span className="absolute right-[18%] top-7 z-20 h-2.5 w-2.5 rounded-full bg-momo-primary/75" />
      <span className="absolute left-[9%] bottom-16 z-20 h-3 w-3 rounded-full bg-momo-primary/65" />

      <svg
        className="relative z-10 h-full w-full drop-shadow-[0_24px_36px_rgba(165,0,100,0.13)]"
        fill="none"
        viewBox="0 0 520 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="270"
            id="softStudentShadow"
            width="520"
            x="0"
            y="20"
          >
            <feDropShadow dx="0" dy="14" floodColor="#A50064" floodOpacity="0.12" stdDeviation="13" />
          </filter>
        </defs>

        <path
          d="M60 186C78 104 146 72 227 93C286 108 313 76 382 90C447 103 486 152 472 226C456 305 97 301 60 244C51 231 55 209 60 186Z"
          fill="#FFF4FA"
        />
        <path
          d="M124 78C195 14 329 27 398 106"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.75"
          strokeWidth="2"
        />
        <ellipse cx="262" cy="265" fill="#F3D8E8" opacity="0.7" rx="204" ry="19" />

        <g filter="url(#softStudentShadow)">
          <g>
            <path
              d="M74 249C72 217 79 184 91 166C102 149 133 149 145 166C158 184 166 218 164 249H74Z"
              fill="#F8A6D4"
            />
            <path
              d="M83 251C82 218 88 188 98 171H137C148 190 155 220 154 251H83Z"
              fill="#FFFFFF"
              opacity="0.84"
            />
            <path
              d="M82 136C81 107 101 88 125 91C151 94 162 118 154 145C147 169 95 170 82 136Z"
              fill="#4B202A"
            />
            <circle cx="119" cy="134" fill="#F4BEAA" r="29" />
            <path d="M88 129C98 96 136 90 154 119C137 113 116 117 100 140L88 129Z" fill="#3A1721" />
            <circle cx="109" cy="136" fill="#111827" r="2" />
            <circle cx="129" cy="136" fill="#111827" r="2" />
            <path d="M112 148C117 152 124 152 129 148" stroke="white" strokeLinecap="round" strokeWidth="3" />
            <rect fill="#F8B7D9" height="64" rx="18" transform="rotate(-9 123 171)" width="36" x="123" y="171" />
            <rect fill="#111827" height="52" rx="7" transform="rotate(-9 129 176)" width="26" x="129" y="176" />
            <rect fill="#FFF4FA" height="38" rx="5" transform="rotate(-9 133 181)" width="18" x="133" y="181" />
          </g>

          <g>
            <path
              d="M168 250C164 214 169 177 188 157C204 140 242 140 258 157C277 177 283 214 279 250H168Z"
              fill="#FFFFFF"
            />
            <path d="M180 250C178 216 184 184 196 164H250C263 185 269 216 267 250H180Z" fill="#F8FAFC" />
            <path d="M186 169L205 201L224 170L243 201L258 169" stroke="#F3D8E8" strokeLinecap="round" strokeWidth="4" />
            <path d="M192 121C189 92 209 72 233 76C262 81 273 110 259 139H195L192 121Z" fill="#16131C" />
            <circle cx="226" cy="126" fill="#F6C6B5" r="31" />
            <path d="M196 115C205 86 245 78 264 109C243 104 222 108 205 130L196 115Z" fill="#111827" />
            <circle cx="216" cy="129" fill="#111827" r="2" />
            <circle cx="238" cy="129" fill="#111827" r="2" />
            <path d="M218 142C225 147 234 147 241 142" stroke="white" strokeLinecap="round" strokeWidth="3" />
            <rect fill="#111827" height="74" rx="16" transform="rotate(-6 233 169)" width="45" x="233" y="169" />
            <rect fill="#FFFFFF" height="56" rx="8" transform="rotate(-6 239 177)" width="31" x="239" y="177" />
            <rect fill="#111827" height="5" rx="1" transform="rotate(-6 246 186)" width="5" x="246" y="186" />
            <rect fill="#111827" height="5" rx="1" transform="rotate(-6 257 185)" width="5" x="257" y="185" />
            <rect fill="#111827" height="5" rx="1" transform="rotate(-6 247 197)" width="5" x="247" y="197" />
            <rect fill="#111827" height="5" rx="1" transform="rotate(-6 258 196)" width="5" x="258" y="196" />
            <rect fill="#111827" height="6" rx="1" transform="rotate(-6 253 207)" width="11" x="253" y="207" />
          </g>

          <g>
            <path
              d="M274 250C271 211 279 175 296 156C311 139 350 139 365 156C383 176 390 213 386 250H274Z"
              fill="#E5007E"
            />
            <path d="M288 250C287 217 292 187 303 168H358C370 188 375 218 374 250H288Z" fill="#D82D8B" />
            <path d="M306 163C319 183 342 183 356 163" stroke="#FFF4FA" strokeLinecap="round" strokeOpacity="0.55" strokeWidth="4" />
            <circle cx="333" cy="101" fill="#3A1721" r="18" />
            <path d="M318 107C314 83 338 67 357 82C372 94 367 126 351 137L318 107Z" fill="#4B202A" />
            <circle cx="333" cy="130" fill="#F4BEAA" r="29" />
            <path d="M308 120C316 95 350 91 363 116C344 111 327 116 316 136L308 120Z" fill="#3A1721" />
            <circle cx="323" cy="132" fill="#111827" r="2" />
            <circle cx="343" cy="132" fill="#111827" r="2" />
            <path d="M325 145C331 150 339 150 345 145" stroke="white" strokeLinecap="round" strokeWidth="3" />
            <rect fill="#F6D7EE" height="64" rx="18" transform="rotate(12 294 168)" width="35" x="294" y="168" />
            <rect fill="#F9FAFB" height="52" rx="7" transform="rotate(12 299 174)" width="25" x="299" y="174" />
            <path d="M306 190H318M306 198H315M306 206H318" stroke="#E5007E" strokeLinecap="round" strokeWidth="2" />
          </g>

          <g>
            <path
              d="M370 250C365 211 373 178 390 159C405 142 442 142 458 159C476 179 485 213 482 250H370Z"
              fill="#A78BFA"
            />
            <path d="M384 250C382 218 389 188 400 169H450C463 189 470 219 468 250H384Z" fill="#C4B5FD" />
            <path d="M392 119C390 92 409 75 433 78C459 81 471 107 462 135H397L392 119Z" fill="#15131B" />
            <circle cx="429" cy="130" fill="#F6C6B5" r="30" />
            <path d="M397 119C409 91 443 87 462 113C442 109 419 113 404 136L397 119Z" fill="#111827" />
            <circle cx="419" cy="132" fill="#111827" r="2" />
            <circle cx="441" cy="132" fill="#111827" r="2" />
            <path d="M421 145C427 149 436 149 442 145" stroke="white" strokeLinecap="round" strokeWidth="3" />
            <rect fill="#FFFFFF" height="76" rx="10" transform="rotate(8 421 174)" width="54" x="421" y="174" />
            <rect fill="#7C3AED" height="56" rx="7" transform="rotate(8 427 183)" width="38" x="427" y="183" />
            <path d="M435 195H456M433 204H455M432 213H450" stroke="#FFFFFF" strokeLinecap="round" strokeOpacity="0.8" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
