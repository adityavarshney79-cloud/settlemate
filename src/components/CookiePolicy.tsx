/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  Cookie, 
  ShieldCheck, 
  Printer, 
  Sliders, 
  ExternalLink, 
  HelpCircle,
  Mail,
  Phone,
  Building2,
  Lock,
  Layers,
  Smartphone
} from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export default function CookiePolicy({ onBack, onNavigate }: CookiePolicyProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800" id="cookie-policy-page">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header navigation & title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 print:hidden">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-[#de5d26] transition mb-3 cursor-pointer"
              id="back-from-cookies-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 text-[#de5d26]">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cookie Policy</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Version 1.0 • Effective Date: 14th September, 2026 • Prepared for SettleMate Limited (New Zealand)
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              title="Print Cookie Policy"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              Privacy Act 2020 Compliant
            </span>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block text-center pb-6 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-slate-900">SETTLEMATE LIMITED — COOKIE POLICY</h1>
          <p className="text-sm text-slate-600 mt-1">Version: 1.0 • Effective Date: 14th September, 2026</p>
          <p className="text-xs text-slate-500">Prepared for SettleMate Limited (New Zealand) • NZBN: 9429053930149</p>
        </div>

        {/* Executive summary card */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50/70 to-slate-50 border border-orange-100 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900 flex items-center space-x-1.5 text-sm">
            <Lock className="w-4 h-4 text-[#de5d26] inline mr-1" />
            <span>Transparency in Tracking & Device Data</span>
          </p>
          <p className="text-xs text-slate-600">
            This Cookie Policy explains how SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar tracking technologies on our website, mobile application (&quot;App&quot;), and other digital services.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-1 font-mono">
            <span>Effective Date: 14th September, 2026</span>
            <span>•</span>
            <span>Last Updated: 14th September, 2026</span>
            <span>•</span>
            <span>NZBN: 9429053930149</span>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">

          {/* 1. PURPOSE AND SCOPE */}
          <section className="pt-6 first:pt-0 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">1.</span>
              <span>PURPOSE AND SCOPE</span>
            </h2>
            <p>
              This Cookie Policy explains how SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar tracking technologies on our website, mobile application (&quot;App&quot;), and other digital services (collectively, the &quot;Digital Services&quot;).
            </p>
            <p>This Cookie Policy forms part of, and should be read alongside, our:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('privacy')}
                  className="text-[#de5d26] underline font-medium hover:text-[#c84617] cursor-pointer"
                >
                  Privacy Policy (v2.0 or as updated from time to time)
                </button>;
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('csa')}
                  className="text-[#de5d26] underline font-medium hover:text-[#c84617] cursor-pointer"
                >
                  Customer Service Agreement (CSA v3.0)
                </button>{' '}
                and Website &amp; Mobile App Terms and Conditions (v2.0 or as updated from time to time).
              </li>
            </ul>
            <p className="text-xs text-slate-600">
              Where a cookie or tracking technology collects personal information (e.g., IP address, device identifiers, usage data linked to your account), we handle that information in accordance with the Privacy Act 2020 and our Privacy Policy. Users located outside New Zealand may have additional privacy rights depending on their jurisdiction.
            </p>
          </section>

          {/* 2. WHAT ARE COOKIES AND TRACKING TECHNOLOGIES? */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">2.</span>
              <span>WHAT ARE COOKIES AND TRACKING TECHNOLOGIES?</span>
            </h2>
            <p>
              Cookies are small text files placed on your device by a website when you visit it. They allow the website to remember your actions and preferences over a period of time.
            </p>
            <p className="font-semibold text-slate-900">Similar tracking technologies include:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong className="text-slate-900">Pixels</strong> — invisible images embedded in web pages or emails that record when a page is viewed or an email is opened;
              </li>
              <li>
                <strong className="text-slate-900">Local storage / session storage</strong> — data stored on your device by your browser or App;
              </li>
              <li>
                <strong className="text-slate-900">Mobile app SDKs</strong> — software development kits integrated into our App that may collect usage, crash, or device data;
              </li>
              <li>
                <strong className="text-slate-900">Device identifiers</strong> — unique identifiers assigned by your device&apos;s operating system (e.g., advertising ID, vendor ID);
              </li>
              <li>
                <strong className="text-slate-900">Push notification tokens</strong> — identifiers used to send push notifications to your device;
              </li>
              <li>
                <strong className="text-slate-900">Analytics tags</strong> — code that collects data about how you interact with our Digital Services.
              </li>
            </ul>
          </section>

          {/* 3. CATEGORIES OF COOKIES AND TRACKING TECHNOLOGIES */}
          <section className="pt-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">3.</span>
              <span>CATEGORIES OF COOKIES AND TRACKING TECHNOLOGIES</span>
            </h2>

            {/* 3.1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                <span className="text-[#de5d26]">3.1</span>
                <span>Strictly Necessary (Essential)</span>
              </h3>
              <p>
                These are required for the website or App to function. Without them, you cannot use core features such as logging in, maintaining your session, or securing your account.
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>They cannot be disabled in our system;</li>
                <li>They do not require separate consent as they are essential to provide the service you have requested;</li>
                <li>They are typically session cookies (deleted when you close your browser) or limited persistent cookies (e.g., remembering your login state).</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                <strong>Examples:</strong> Authentication cookies, security tokens, anti-fraud measures, load balancing cookies.
              </p>
            </div>

            {/* 3.2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                <span className="text-[#de5d26]">3.2</span>
                <span>Preferences and Functionality</span>
              </h3>
              <p>These remember your settings and preferences to improve your experience.</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>They are optional;</li>
                <li>You can disable them, but some personalisation features may not work;</li>
                <li>They are typically persistent cookies with a short to medium lifespan.</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                <strong>Examples:</strong> Language preference, display settings, recently viewed properties (if applicable).
              </p>
            </div>

            {/* 3.3 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                <span className="text-[#de5d26]">3.3</span>
                <span>Analytics and Performance</span>
              </h3>
              <p>These help us understand how visitors use our Digital Services so we can improve performance and user experience.</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>They are optional;</li>
                <li>You can disable them or opt out via your browser or device settings;</li>
                <li>We may use de-identified or aggregate data where practicable;</li>
                <li>Where analytics providers collect personal information (e.g., IP address, device ID), this is handled under IPP 5 (security) and section 11 (service providers) of the Privacy Act 2020.</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                <strong>Examples:</strong> Page views, session duration, error logs, crash reports, feature usage.
              </p>
            </div>

            {/* 3.4 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                <span className="text-[#de5d26]">3.4</span>
                <span>Marketing and Remarketing (If Applicable)</span>
              </h3>
              <p>These may be used to deliver relevant content or advertising, where you have consented or where otherwise permitted by law.</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>They are optional;</li>
                <li>We will not use marketing cookies without your consent where consent is required;</li>
                <li>Marketing-related commercial electronic messages are also subject to the Unsolicited Electronic Messages Act 2007 (UEMA), which requires consent, sender identification, and a functional unsubscribe facility;</li>
                <li>Cookies themselves are not &quot;commercial electronic messages&quot; under the UEMA, but any marketing activity informed by cookie data must comply with the Privacy Act and applicable marketing laws.</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                <strong>Examples:</strong> Remarketing pixels, advertising platform conversion tracking.
              </p>
            </div>

            {/* 3.5 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                <span className="text-[#de5d26]">3.5</span>
                <span>Mobile App SDKs and Device Tracking</span>
              </h3>
              <p>Our App may integrate third-party SDKs that collect device and usage data:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li><strong className="text-slate-800">Analytics SDKs</strong> — collect usage and performance data;</li>
                <li><strong className="text-slate-800">Crash reporting SDKs</strong> — collect crash logs and device information to help us fix bugs;</li>
                <li><strong className="text-slate-800">Push notification SDKs</strong> — manage push notification tokens;</li>
                <li><strong className="text-slate-800">Authentication SDKs</strong> — facilitate login.</li>
              </ul>
              <p className="text-xs text-slate-600 pt-1">
                These SDKs may process data on our behalf under section 11 of the Privacy Act 2020, or may handle information for their own purposes and have their own privacy obligations. Where they act on our behalf, we require contractual safeguards including security, breach notification, and data return/deletion provisions.
              </p>
            </div>
          </section>

          {/* 4. INFORMATION COLLECTED */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">4.</span>
              <span>INFORMATION COLLECTED</span>
            </h2>
            <p>Cookies and tracking technologies may collect the following types of information:</p>

            {/* Data Type Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-800">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 text-left">Data Type</th>
                    <th scope="col" className="px-4 py-2.5 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Device/browser data</td>
                    <td className="px-4 py-2 text-slate-600">IP address, browser type and version, operating system, screen resolution</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Session data</td>
                    <td className="px-4 py-2 text-slate-600">Pages or screens viewed, time spent, click paths, feature usage</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Device identifiers</td>
                    <td className="px-4 py-2 text-slate-600">Advertising ID, vendor ID, push notification token</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Account data (if logged in)</td>
                    <td className="px-4 py-2 text-slate-600">User ID, account preferences, authenticated session state</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Location (approximate)</td>
                    <td className="px-4 py-2 text-slate-600">Country or region derived from IP address (not precise GPS unless granted)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Crash and error data</td>
                    <td className="px-4 py-2 text-slate-600">Crash logs, error messages, stack traces</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Marketing attribution</td>
                    <td className="px-4 py-2 text-slate-600">Referrer source, campaign identifiers (if marketing cookies are used)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-1.5 pt-2 text-xs">
              <p>
                <strong className="text-slate-900">Minimisation (IPP 1):</strong> We only collect information through cookies that is necessary for the purposes described in this Cookie Policy. We do not use cookies to collect sensitive information such as health data, biometric data, or political or religious beliefs.
              </p>
              <p>
                <strong className="text-slate-900">Logged-in tracking:</strong> If you are logged in to your account, analytics and session data may be linked to your account. If you are not logged in, data may be linked to browser or device identifiers instead.
              </p>
              <p className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-amber-950 font-medium">
                <strong className="text-slate-900">What we do not do:</strong> We do not sell cookie or SDK data to third parties. We do not use cookie or SDK data to collect the contents of documents, messages, or property files you upload to our platform.
              </p>
            </div>
          </section>

          {/* 5. WHY WE USE COOKIES AND TRACKING TECHNOLOGIES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">5.</span>
              <span>WHY WE USE COOKIES AND TRACKING TECHNOLOGIES</span>
            </h2>
            <p>We use cookies and tracking technologies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong className="text-slate-800">Authentication and security</strong> — to keep you logged in, verify your identity, and protect against unauthorised access (IPP 1, IPP 5);</li>
              <li><strong className="text-slate-800">Functionality</strong> — to remember your preferences and settings;</li>
              <li><strong className="text-slate-800">Analytics and improvement</strong> — to understand how you use our Digital Services and identify areas for improvement (IPP 1);</li>
              <li><strong className="text-slate-800">Fraud prevention</strong> — to detect and prevent misuse of our platform;</li>
              <li><strong className="text-slate-800">Communication</strong> — to manage push notification tokens and in-app messaging;</li>
              <li><strong className="text-slate-800">Marketing (if applicable)</strong> — to measure the effectiveness of marketing campaigns and deliver relevant content, only with your consent or where otherwise permitted by law.</li>
            </ul>
          </section>

          {/* 6. THIRD-PARTY PROVIDERS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">6.</span>
              <span>THIRD-PARTY PROVIDERS</span>
            </h2>
            <p>Some cookies and SDKs are operated by third-party providers:</p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-800">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left">Provider Category</th>
                    <th scope="col" className="px-3 py-2 text-left">Provider Name</th>
                    <th scope="col" className="px-3 py-2 text-left">Purpose</th>
                    <th scope="col" className="px-3 py-2 text-left">Data Collected</th>
                    <th scope="col" className="px-3 py-2 text-left">Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Cloud hosting</td>
                    <td className="px-3 py-2 text-slate-700">Google Cloud Platform / Firebase</td>
                    <td className="px-3 py-2 text-slate-600">Hosts website and App</td>
                    <td className="px-3 py-2 text-slate-600">Server logs, IP address</td>
                    <td className="px-3 py-2 text-slate-600">30 days</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-3 py-2 font-medium text-slate-900">Web analytics</td>
                    <td className="px-3 py-2 text-slate-700">SettleMate Internal Telemetry</td>
                    <td className="px-3 py-2 text-slate-600">Website usage analytics</td>
                    <td className="px-3 py-2 text-slate-600">Page views, session data</td>
                    <td className="px-3 py-2 text-slate-600">14 months</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">App analytics</td>
                    <td className="px-3 py-2 text-slate-700">Audit Diagnostics Service</td>
                    <td className="px-3 py-2 text-slate-600">App usage analytics</td>
                    <td className="px-3 py-2 text-slate-600">App events, device ID</td>
                    <td className="px-3 py-2 text-slate-600">12 months</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-3 py-2 font-medium text-slate-900">Crash reporting</td>
                    <td className="px-3 py-2 text-slate-700">Application Error Logger</td>
                    <td className="px-3 py-2 text-slate-600">App crash diagnostics</td>
                    <td className="px-3 py-2 text-slate-600">Crash logs, device info</td>
                    <td className="px-3 py-2 text-slate-600">90 days</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Push notifications</td>
                    <td className="px-3 py-2 text-slate-700">Web Push Relays</td>
                    <td className="px-3 py-2 text-slate-600">Push notification delivery</td>
                    <td className="px-3 py-2 text-slate-600">Device token, app ID</td>
                    <td className="px-3 py-2 text-slate-600">Duration of token</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-3 py-2 font-medium text-slate-900">Email/SMS</td>
                    <td className="px-3 py-2 text-slate-700">Transactional Relays</td>
                    <td className="px-3 py-2 text-slate-600">Transactional communications</td>
                    <td className="px-3 py-2 text-slate-600">Email, phone, status</td>
                    <td className="px-3 py-2 text-slate-600">12 months</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Payment processing</td>
                    <td className="px-3 py-2 text-slate-700">Encrypted Gateway</td>
                    <td className="px-3 py-2 text-slate-600">Process subscription payments</td>
                    <td className="px-3 py-2 text-slate-600">Payment token, transaction data</td>
                    <td className="px-3 py-2 text-slate-600">7 years (tax laws)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-slate-600">
              <p>
                <strong className="text-slate-900">Section 11 accountability:</strong> Where a third-party provider processes personal information on our behalf, SettleMate remains responsible for that information under section 11 of the Privacy Act 2020. We require contractual safeguards including security measures, breach notification, and data deletion at the end of the engagement.
              </p>
              <p>
                <strong className="text-slate-900">Overseas processing:</strong> Some third-party providers may store or process data outside New Zealand. Where they act as service providers on our behalf, we remain responsible for the information. Where we disclose personal information overseas (not as a service provider), we comply with IPP 12. See our Privacy Policy for further detail.
              </p>
            </div>
          </section>

          {/* 7. COOKIE RETENTION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">7.</span>
              <span>COOKIE RETENTION</span>
            </h2>
            <p>Cookies and tracking data are retained for different periods depending on their purpose:</p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-800">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 text-left">Category</th>
                    <th scope="col" className="px-4 py-2.5 text-left">Typical Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Session cookies (essential)</td>
                    <td className="px-4 py-2 text-slate-600">Deleted when you close your browser</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Authentication cookies</td>
                    <td className="px-4 py-2 text-slate-600">30 days or until you log out</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Preference cookies</td>
                    <td className="px-4 py-2 text-slate-600">12 months</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Analytics cookies</td>
                    <td className="px-4 py-2 text-slate-600">14 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Marketing cookies (if used)</td>
                    <td className="px-4 py-2 text-slate-600">180 days or per provider policy</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">App SDK data</td>
                    <td className="px-4 py-2 text-slate-600">Per provider agreement; deleted when no longer required</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Crash logs</td>
                    <td className="px-4 py-2 text-slate-600">90 days</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Push notification tokens</td>
                    <td className="px-4 py-2 text-slate-600">Until you uninstall the App or revoke permission</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-600 pt-1">
              <strong className="text-slate-900">IPP 9 (Retention):</strong> We do not keep personal information collected via cookies for longer than is necessary for the purpose for which it was collected, or as required by law. When data is no longer needed, it is deleted or de-identified.
            </p>
          </section>

          {/* 8. YOUR CHOICES AND HOW TO MANAGE COOKIES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">8.</span>
              <span>YOUR CHOICES AND HOW TO MANAGE COOKIES</span>
            </h2>

            <div className="space-y-2">
              <strong className="text-slate-900 block font-semibold">8.1 Browser Controls:</strong>
              <p>You can control or delete cookies through your browser settings:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Most browsers allow you to refuse all or some cookies;</li>
                <li>You can usually delete existing cookies;</li>
                <li>Some browsers offer &quot;Do Not Track&quot; (DNT) signals; our response to DNT depends on the tools we use. You can manage cookies through your browser or device settings regardless of DNT.</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Instructions are available in settings for Google Chrome, Mozilla Firefox, Apple Safari (macOS/iOS), and Microsoft Edge.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <strong className="text-slate-900 block font-semibold">8.2 Mobile App Settings:</strong>
              <p>You can manage tracking in our App through:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li><strong className="text-slate-800">Device privacy settings</strong> — iOS App Tracking Transparency (Settings &gt; Privacy &amp; Security &gt; Tracking) and Android privacy controls (Settings &gt; Privacy &gt; Ads);</li>
                <li><strong className="text-slate-800">Advertising ID reset</strong> — you can reset or delete your device&apos;s advertising ID through your operating system settings;</li>
                <li><strong className="text-slate-800">Push notifications</strong> — you can disable push notifications through your device settings at any time;</li>
                <li><strong className="text-slate-800">App permissions</strong> — you can manage device permissions (e.g., location, camera) through your device settings.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <strong className="text-slate-900 block font-semibold">8.3 Analytics &amp; Marketing Opt-Out:</strong>
              <p>If you have consented to marketing cookies, you can withdraw consent at any time by:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Disabling marketing cookies in your browser or device settings;</li>
                <li>Using the unsubscribe facility in our commercial electronic messages;</li>
                <li>Contacting us at <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] underline font-medium">info@settlemate.co.nz</a>.</li>
              </ul>
              <p className="text-xs text-slate-500 italic">
                Opting out of marketing cookies does not affect non-promotional service, account, security, or legal compliance messages that we are permitted or required to send.
              </p>
            </div>
          </section>

          {/* 9. UNIQUE IDENTIFIERS AND DEVICE IDS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">9.</span>
              <span>UNIQUE IDENTIFIERS AND DEVICE IDS (IPP 13)</span>
            </h2>
            <p>
              Some cookies and tracking technologies use unique identifiers, such as internal account IDs, device identifiers, or push notification tokens.
            </p>
            <p>We only assign or use unique identifiers where necessary for our operational functions. We will not:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>use a government-issued identifier (e.g., IRD number, driver&apos;s licence) as our identifier;</li>
              <li>require you to disclose a unique identifier assigned by another organisation unless connected to the purpose for which it was assigned.</li>
            </ul>
            <p className="text-xs text-slate-600">
              We take reasonable steps to verify identity before assigning identifiers and to minimise the risk of misuse (e.g., by truncating identifiers where practicable).
            </p>
          </section>

          {/* 10. EMAIL TRACKING */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">10.</span>
              <span>EMAIL TRACKING (IF APPLICABLE)</span>
            </h2>
            <p>
              If we send you emails, they may include tracking pixels or similar technologies to determine whether the email has been opened or links have been clicked. This helps us measure engagement and improve our communications.
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>Email tracking is only used for emails sent by SettleMate;</li>
              <li>If you do not wish to receive tracked emails, you can unsubscribe from marketing communications using the unsubscribe facility in each message;</li>
              <li>Transactional and service-related emails may still include basic delivery tracking.</li>
            </ul>
          </section>

          {/* 11. EFFECT OF DISABLING COOKIES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">11.</span>
              <span>EFFECT OF DISABLING COOKIES</span>
            </h2>
            <p>If you disable all cookies, the following may occur:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>you may not be able to log in to your account;</li>
              <li>your preferences may not be remembered;</li>
              <li>some features may not function correctly;</li>
              <li>you may still receive essential security and service communications.</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              Essential cookies cannot be disabled through SettleMate&apos;s cookie preferences, but you may block them in your browser; core features may not work if you do.
            </p>
          </section>

          {/* 12. UPDATES TO THIS COOKIE POLICY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">12.</span>
              <span>UPDATES TO THIS COOKIE POLICY</span>
            </h2>
            <p>We may update this Cookie Policy from time to time.</p>
            <div className="space-y-1 text-slate-600">
              <p>
                <strong className="text-slate-800">Material Changes:</strong> Where a change is material (e.g., adding a new tracking technology or changing a purpose), we will provide at least 30 days&apos; notice before the change takes effect by email, in-app notification, or prominent notice on our website.
              </p>
              <p>
                <strong className="text-slate-800">Non-Material Changes:</strong> We may make non-material changes (e.g., updating provider names, correcting errors) without prior notice.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              The updated version will take effect from the date specified at the top of this Cookie Policy.
            </p>
          </section>

          {/* 13. CONTACT US */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">13.</span>
              <span>CONTACT US</span>
            </h2>
            <p>If you have questions about this Cookie Policy or how we use cookies and tracking technologies, please contact:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                  <Building2 className="w-4 h-4 text-[#de5d26]" />
                  <span>Privacy Officer — SettleMate Limited</span>
                </div>
                <p className="text-slate-600 pl-6">Registered Office: 36C, Whitford road, Botany downs, 2014 NZ</p>
                <p className="text-slate-600 pl-6">NZBN: 9429053930149</p>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Mail className="w-4 h-4 text-[#de5d26]" />
                  <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] hover:underline font-mono">
                    info@settlemate.co.nz
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-4 h-4 text-[#de5d26]" />
                  <span className="text-slate-600 font-mono">0220709159</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <ExternalLink className="w-4 h-4 text-[#de5d26]" />
                  <a href="https://www.settlemate.co.nz" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline">
                    www.settlemate.co.nz
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner (New Zealand) at{' '}
              <a href="https://www.privacy.org.nz" target="_blank" rel="noopener noreferrer" className="text-[#de5d26] underline">
                www.privacy.org.nz
              </a>{' '}
              or on 0800 803 909.
            </p>
          </section>

        </div>

        {/* Footer info & navigation within Cookie Policy */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 print:hidden">
          <p>© 2026 SettleMate Limited (New Zealand). All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate && onNavigate('privacy')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate && onNavigate('csa')}
              className="hover:text-[#de5d26] underline font-semibold text-[#de5d26] cursor-pointer"
            >
              CSA
            </button>
            <button
              onClick={() => onNavigate && onNavigate('disclaimer')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Disclaimer
            </button>
            <button
              onClick={onBack}
              className="text-[#de5d26] font-semibold hover:underline cursor-pointer"
            >
              Back to App
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
