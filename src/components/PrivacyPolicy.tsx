/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  UserCheck, 
  HelpCircle, 
  Printer, 
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Scale
} from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export default function PrivacyPolicy({ onBack, onNavigate }: PrivacyPolicyProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800" id="privacy-policy-page">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header navigation & title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 print:hidden">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-[#de5d26] transition mb-3 cursor-pointer"
              id="back-from-privacy-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 text-[#de5d26]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Version 2.0 (Legally Enhanced) • SettleMate Limited (New Zealand)
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              title="Print Policy"
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
          <h1 className="text-2xl font-bold text-slate-900">SETTLEMATE LIMITED — PRIVACY POLICY</h1>
          <p className="text-sm text-slate-600 mt-1">Version: 2.0 (Legally Enhanced)</p>
          <p className="text-xs text-slate-500">Effective Date: 9th September 2026 • Prepared for SettleMate Limited (New Zealand)</p>
        </div>

        {/* Meta summary card */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50/70 to-slate-50 border border-orange-100 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900 flex items-center space-x-1.5 text-sm">
            <Lock className="w-4 h-4 text-[#de5d26] inline mr-1" />
            <span>At SettleMate, your financial and property privacy is our highest priority.</span>
          </p>
          <p className="text-xs text-slate-600">
            SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and handling your personal information responsibly in accordance with the Privacy Act 2020 (New Zealand) and its Information Privacy Principles (IPPs).
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-1 font-mono">
            <span>Effective Date: 9th September 2026</span>
            <span>•</span>
            <span>Last Updated: 9th September 2026</span>
            <span>•</span>
            <span>NZBN: 9429053930149</span>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">

          {/* 1. ABOUT THIS PRIVACY POLICY */}
          <section className="pt-6 first:pt-0 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">1.</span>
              <span>ABOUT THIS PRIVACY POLICY</span>
            </h2>
            <p>
              SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and handling your personal information responsibly in accordance with the Privacy Act 2020 (New Zealand) and its Information Privacy Principles (IPPs).
            </p>
            <p>
              Personal information means information about an identifiable individual, including information that can identify someone when combined with other information.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information. It is a transparency notice designed to help you understand our privacy practices.
            </p>
            <p>
              By accessing our website, using our mobile application (&quot;App&quot;), creating an account, or engaging our services, you acknowledge that you have read and understood this Privacy Policy. Where your consent is required for a specific activity (such as marketing communications or referral introductions), we will seek your consent at the relevant time.
            </p>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <p className="font-bold text-slate-900">Consequences of Not Providing Information:</p>
              <p>Providing your personal information is voluntary. However, if you do not provide certain information, SettleMate may be unable to:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>create or manage your account;</li>
                <li>provide coordination services to you;</li>
                <li>contact your nominated providers;</li>
                <li>facilitate referral introductions;</li>
                <li>comply with our legal obligations.</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1 italic">
                We will inform you at the point of collection whether specific information is required or optional.
              </p>
            </div>
          </section>

          {/* 2. WHO WE ARE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">2.</span>
              <span>WHO WE ARE</span>
            </h2>
            <p>
              SettleMate Limited provides independent home-buying coordination and referral services.
            </p>
            <p>
              Our role is to help coordinate the home-buying journey by connecting clients with independent professionals, managing milestones, and facilitating communication.
            </p>
            <p className="font-semibold text-slate-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-amber-950">
              We are not a law firm, real estate agency, mortgage adviser, financial adviser, or insurance adviser.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p>
                <strong className="text-slate-900">Privacy Officer:</strong> SettleMate is required to have a Privacy Officer under the Privacy Act 2020. Our Privacy Officer can be contacted at{' '}
                <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] font-medium underline">info@settlemate.co.nz</a> or by mail at 36C whitford road, Botany Downs, Auckland 2014 NZ.
              </p>
            </div>
          </section>

          {/* 3. PERSONAL INFORMATION WE COLLECT (IPP 1) */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">3.</span>
              <span>PERSONAL INFORMATION WE COLLECT (IPP 1 — Purpose and Necessity)</span>
            </h2>
            <p>
              We only collect personal information that is necessary for a lawful purpose connected with our functions or activities. We will not collect more information than is necessary for the purpose for which it is collected.
            </p>
            <p>Depending on the services you use, we may collect:</p>

            <div className="space-y-3 pl-2">
              <div>
                <strong className="text-slate-900 block font-semibold">Identity Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Full name</li>
                  <li>Preferred name</li>
                  <li>Date of birth (only where reasonably necessary for a specific service)</li>
                  <li>Government-issued identification (only where legally required, such as for AML/CFT compliance, or where identity verification is reasonably necessary for a specific service)</li>
                </ul>
                <div className="mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                  <strong className="text-slate-900 block mb-0.5">Identity Document Handling:</strong>
                  <span>Where we collect government-issued identification, we will: store copies separately from other personal information; restrict access to authorised personnel only; and delete the information as soon as verification is complete or the legal retention period expires, unless another law requires retention.</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Contact Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Residential address</li>
                  <li>Postal address</li>
                  <li>Email address</li>
                  <li>Mobile number</li>
                  <li>Emergency contact (if provided)</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Property Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Intended purchase location</li>
                  <li>Property address</li>
                  <li>Property type</li>
                  <li>Purchase status</li>
                  <li>Settlement dates</li>
                  <li>Moving dates</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Home-Buying Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Mortgage adviser details</li>
                  <li>Lawyer details</li>
                  <li>Real estate agent details</li>
                  <li>Insurance adviser details</li>
                  <li>Builder or inspector details</li>
                  <li>Utility provider preferences</li>
                  <li>Service milestones</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Account Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Username</li>
                  <li>Password (stored securely in hashed form)</li>
                  <li>Device identifiers</li>
                  <li>App preferences</li>
                  <li>Notification settings</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Communication Records:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>Emails</li>
                  <li>Support requests</li>
                  <li>In-app messages</li>
                  <li>SMS communications</li>
                  <li>Phone call notes</li>
                  <li>Appointment history</li>
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">Technical Information:</strong>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Usage analytics</li>
                  <li>Error logs</li>
                  <li>Session information</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 text-xs">
              <strong className="text-slate-900 block mb-0.5">Information we do not intentionally collect:</strong>
              <p className="text-slate-600">
                Unless necessary for a specific service, we do not intentionally collect health information, biometric information, criminal history, political opinions, or religious beliefs. If such information is provided voluntarily, it will be handled in accordance with applicable law and only where necessary for the requested service.
              </p>
            </div>
          </section>

          {/* 4. HOW WE COLLECT INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">4.</span>
              <span>HOW WE COLLECT INFORMATION (IPP 2 — Source and IPP 4 — Manner)</span>
            </h2>
            <p><strong className="text-slate-900">IPP 2 — Source of Information:</strong> We collect personal information:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>directly from you when you register, contact us, or complete forms;</li>
              <li>through your use of our website and App;</li>
              <li>from third parties where you have authorised this (for example, your lawyer or mortgage adviser providing your contact details to us); and</li>
              <li>where otherwise permitted or required by law.</li>
            </ul>
            <p className="text-xs text-slate-600">
              We collect personal information directly from you wherever practicable. Where we collect information from a third party, we will comply with our indirect collection notification obligations under IPP 3A (see clause 5 below).
            </p>
            <p className="pt-1">
              <strong className="text-slate-900">IPP 4 — Manner of Collection:</strong> We collect information by lawful means and in a manner that is not unreasonably intrusive. We will not collect information by deception or coercion.
            </p>
          </section>

          {/* 5. NOTIFICATION WHEN WE COLLECT YOUR INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">5.</span>
              <span>NOTIFICATION WHEN WE COLLECT YOUR INFORMATION</span>
            </h2>
            <div className="space-y-2">
              <p><strong className="text-slate-900">IPP 3 — Direct Collection Notice:</strong> When we collect personal information directly from you, we will take reasonable steps to ensure you are aware of:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>(a) the fact that the information is being collected;</li>
                <li>(b) the purpose for which the information is being collected;</li>
                <li>(c) the intended recipients of the information;</li>
                <li>(d) the name and address of SettleMate (the agency collecting and holding the information);</li>
                <li>(e) whether the collection is authorised or required by law, and if so, the particular law;</li>
                <li>(f) whether you are required to provide the information, and the consequences of not providing it; and</li>
                <li>(g) your rights to access and correct the information we hold about you.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <p><strong className="text-slate-900">IPP 3A — Indirect Collection Notice (Effective 1 May 2026):</strong> Where we collect personal information about you from a third party (for example, your lawyer, mortgage adviser, real estate agent, or emergency contact provides us with your contact details), we will take reasonable steps to ensure you are aware of:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>(a) the fact that the information has been collected;</li>
                <li>(b) the purpose of the collection;</li>
                <li>(c) the intended recipients of the information;</li>
                <li>(d) the name and address of SettleMate (the agency collecting and holding the information);</li>
                <li>(e) whether the collection is authorised or required by law, and if so, the particular law; and</li>
                <li>(f) your rights to access and correct the information.</li>
              </ul>
              <p className="text-xs text-slate-600">
                We will provide this notification as soon as reasonably practicable after collecting the information, unless an exception applies under the Privacy Act 2020 (for example, where the information is already publicly available, or where notification would prejudice the interests of the individual concerned).
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 text-xs space-y-1">
              <p><strong className="text-slate-900">Third-Party Personal Information:</strong> If you provide personal information about other individuals (e.g., your lawyer, mortgage adviser, real estate agent, emergency contact, or household members), you confirm that:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>(a) you have authority to provide that information, or you have notified the individual that you are providing their details to SettleMate; and</li>
                <li>(b) the information is accurate and provided for the purpose of facilitating your home-buying coordination.</li>
              </ul>
              <p className="text-slate-600 pt-1">
                SettleMate may notify those individuals of the collection where required by the Privacy Act 2020, including under IPP 3A. Emergency contact details will only be used for the stated purpose and will not be used for marketing.
              </p>
            </div>
          </section>

          {/* 6. WHY WE COLLECT YOUR INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">6.</span>
              <span>WHY WE COLLECT YOUR INFORMATION (IPP 1 — Purpose)</span>
            </h2>
            <p>We collect personal information for the following lawful purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>to provide our coordination services to you;</li>
              <li>to create and manage your account;</li>
              <li>to communicate with you about your home-buying journey;</li>
              <li>to coordinate with your nominated third-party service providers;</li>
              <li>to facilitate introductions to referral partners (with your authorisation);</li>
              <li>to provide customer support;</li>
              <li>to improve our products and services (using de-identified or aggregate data where practicable);</li>
              <li>to comply with our legal obligations;</li>
              <li>to detect fraud or misuse of our platform; and</li>
              <li>to maintain the security of our systems.</li>
            </ul>
            <p className="text-xs text-slate-600">
              We will not use your information for purposes unrelated to those for which it was collected unless: the new purpose is directly related to the original purpose; you have authorised the use; the information is used in a form that does not identify you; or the use is otherwise permitted or required by law.
            </p>
          </section>

          {/* 7. USE OF YOUR INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">7.</span>
              <span>USE OF YOUR INFORMATION (IPP 10 — Limits on Use)</span>
            </h2>
            <p>
              We will only use your personal information for the purpose for which it was collected, or for a directly related purpose, unless:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>you have authorised the use for a different purpose;</li>
              <li>the information is used in a de-identified or statistical form;</li>
              <li>the use is necessary to prevent or lessen a serious threat to public health or safety, or to the life or health of any individual; or</li>
              <li>the use is otherwise permitted or required by law.</li>
            </ul>
          </section>

          {/* 8. ACCURACY OF YOUR INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">8.</span>
              <span>ACCURACY OF YOUR INFORMATION (IPP 8)</span>
            </h2>
            <p>
              Before using or disclosing your personal information, we will take reasonable steps to ensure that the information is accurate, up to date, complete, and not misleading, having regard to the purpose for which it may lawfully be used.
            </p>
            <p>
              You can help us maintain accurate records by promptly notifying us of any changes to your personal information.
            </p>
          </section>

          {/* 9. SHARING YOUR INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">9.</span>
              <span>SHARING YOUR INFORMATION (IPP 11 — Disclosure)</span>
            </h2>
            <p>
              We may disclose your personal information where we believe, on reasonable grounds, that the disclosure is for a purpose for which the information was collected, or is directly related to that purpose.
            </p>
            
            <div className="space-y-1 pl-2">
              <strong className="text-slate-900 block font-semibold">Your Nominated Providers:</strong>
              <p>We may share your information with service providers you have nominated, such as:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>your mortgage adviser;</li>
                <li>your lawyer;</li>
                <li>your real estate agent;</li>
                <li>your insurer;</li>
                <li>your building inspector;</li>
                <li>your moving company; or</li>
                <li>your utility providers.</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                We will only share information that is reasonably necessary for the relevant purpose.
              </p>
            </div>

            <div className="space-y-1 pl-2 pt-2">
              <strong className="text-slate-900 block font-semibold">Referral Partners:</strong>
              <p>
                Where you ask us to introduce you to a referral partner, we may provide that partner with relevant contact and transaction information necessary to facilitate the introduction. We will not share your information with a referral partner without your authorisation. You remain free to choose whether to engage any referred provider.
              </p>
            </div>

            <div className="space-y-1 pl-2 pt-2">
              <strong className="text-slate-900 block font-semibold">Other Disclosures:</strong>
              <p>We may also disclose your personal information where:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>you have authorised the disclosure;</li>
                <li>the disclosure is necessary to prevent or lessen a serious threat to public health or safety, or to the life or health of any individual;</li>
                <li>the disclosure is necessary to uphold or enforce the law;</li>
                <li>the disclosure is required by law (e.g., to regulators or law enforcement); or</li>
                <li>the disclosure is necessary to facilitate the sale or disposition of our business as a going concern.</li>
              </ul>
            </div>
          </section>

          {/* 10. OVERSEAS DISCLOSURE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">10.</span>
              <span>OVERSEAS DISCLOSURE AND OVERSEAS SERVICE PROVIDERS (IPP 12 and Section 11)</span>
            </h2>
            <div className="space-y-1">
              <strong className="text-slate-900 block font-semibold">Overseas Service Providers:</strong>
              <p>
                Some of our technology providers, cloud service providers, or analytics providers may store or process personal information outside New Zealand on our behalf. Where a service provider stores or processes information solely on our behalf, SettleMate remains responsible for that information under section 11 of the Privacy Act 2020. We take reasonable steps to ensure that our service providers protect the information in accordance with our instructions and the Privacy Act, including through contractual safeguards, due diligence, and breach notification requirements.
              </p>
            </div>
            <div className="space-y-1 pt-2">
              <strong className="text-slate-900 block font-semibold">Overseas Disclosure (IPP 12):</strong>
              <p>Where we disclose personal information to an overseas recipient (not as a service provider acting on our behalf), we will only do so if we believe, on reasonable grounds, that:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>(a) the recipient is subject to the Privacy Act 2020 because they do business in New Zealand; or</li>
                <li>(b) the recipient is subject to privacy laws that provide comparable safeguards to the Privacy Act 2020; or</li>
                <li>(c) we have taken reasonable steps to ensure comparable protections are in place (e.g., through contractual terms).</li>
              </ul>
              <p className="text-xs text-slate-600 pt-1">
                If none of the above applies, we will only disclose personal information overseas with your express permission. We will inform you that your information may not receive the same protection as provided by the New Zealand Privacy Act.
              </p>
            </div>
          </section>

          {/* 11. DATA SECURITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">11.</span>
              <span>DATA SECURITY (IPP 5 — Storage and Security)</span>
            </h2>
            <p>
              We take reasonable steps to protect your personal information against loss, unauthorised access, use, modification, disclosure, and other misuse. The safeguards we implement, which may include the following where appropriate to the circumstances:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 py-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span>• encryption of data in transit (e.g., HTTPS/TLS)</span>
              <span>• encryption of sensitive data at rest where appropriate</span>
              <span>• multi-factor authentication for administrative access</span>
              <span>• role-based access controls</span>
              <span>• secure password hashing</span>
              <span>• routine software updates and security patching</span>
              <span>• system monitoring and logging</span>
              <span>• secure cloud infrastructure</span>
              <span className="sm:col-span-2">• regular data backups</span>
            </div>
            <div className="space-y-1 pt-2">
              <strong className="text-slate-900 block font-semibold">Third-Party Service Providers:</strong>
              <p>Where we provide personal information to a third-party service provider (such as a cloud hosting provider, payment processor, or analytics provider), we will:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>conduct due diligence before engaging the provider;</li>
                <li>ensure contractual obligations are in place requiring the provider to protect the information and comply with applicable privacy laws;</li>
                <li>require the provider to notify us promptly of any privacy breach affecting your information; and</li>
                <li>ensure the provider only uses the information to deliver services to us and does not use or disclose it for their own purposes.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 italic">
              While we take reasonable precautions, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 12. DATA RETENTION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">12.</span>
              <span>DATA RETENTION (IPP 9 — Retention Limits)</span>
            </h2>
            <p>
              We retain personal information only for as long as is necessary for the purposes for which it may lawfully be used, or as required by law.
            </p>
            
            {/* Indicative Retention Periods Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl mt-2">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 font-bold text-slate-800">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 text-left">Category</th>
                    <th scope="col" className="px-4 py-2.5 text-left">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Active account information</td>
                    <td className="px-4 py-2 text-slate-600">Duration of your account</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Communication records (emails, SMS, in-app messages)</td>
                    <td className="px-4 py-2 text-slate-600">Duration of account + 12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Accounting and tax records</td>
                    <td className="px-4 py-2 text-slate-600">As required by the Inland Revenue Department Acts (typically 7 years)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Legal agreements, consents, and referral authorisations</td>
                    <td className="px-4 py-2 text-slate-600">Duration of account + 7 years (for dispute/legal purposes)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Raw messages, documents, and property journey data</td>
                    <td className="px-4 py-2 text-slate-600">Duration of account + 12 months (unless subject to legal hold)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Identity verification documents (if collected)</td>
                    <td className="px-4 py-2 text-slate-600">Deleted promptly after verification, unless AML/CFT or another law requires retention for a specific period</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Technical and usage data</td>
                    <td className="px-4 py-2 text-slate-600">24 months</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-medium text-slate-900">Marketing consent records</td>
                    <td className="px-4 py-2 text-slate-600">Duration of consent + 12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-slate-900">Closed account data</td>
                    <td className="px-4 py-2 text-slate-600">Deleted or anonymised within 12 months of closure, subject to legal retention requirements</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="pt-2 text-xs text-slate-600">
              When information is no longer required, we will securely delete, destroy, or de-identify it, unless we are legally required to retain it (e.g., for tax records under the Inland Revenue Department Acts, or for legal proceedings).
            </p>
            <div className="space-y-1 text-xs text-slate-600 pt-1">
              <p>
                <strong className="text-slate-900">Backups:</strong> Information may continue to exist in backup systems for a reasonable period after deletion. Backup data is not readily accessible and is overwritten in accordance with our backup retention schedule.
              </p>
              <p>
                <strong className="text-slate-900">Legal Holds:</strong> Where litigation or regulatory investigation is anticipated or underway, we may retain information beyond the standard retention period until the matter is resolved.
              </p>
            </div>
          </section>

          {/* 13. YOUR PRIVACY RIGHTS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">13.</span>
              <span>YOUR PRIVACY RIGHTS (IPP 6 — Access and IPP 7 — Correction)</span>
            </h2>
            <div className="space-y-1.5">
              <strong className="text-slate-900 block font-semibold">IPP 6 — Right to Access:</strong>
              <p>
                You have the right to request access to the personal information we hold about you. We will respond to your request as soon as reasonably practicable, and in any case within 20 working days of receiving your request.
              </p>
              <p>We may:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>grant access to all or some of the information;</li>
                <li>refuse access where a withholding ground applies under the Privacy Act 2020 (e.g., where disclosure would breach another person&apos;s privacy, or where the information is evaluative material);</li>
                <li>extend the response timeframe by a reasonable period where the request is voluminous or complex (we will notify you of any extension within 20 working days, with reasons and your right to complain to the Privacy Commissioner).</li>
              </ul>
              <p className="text-xs text-slate-600">
                If we do not hold the information but know another organisation does, we may transfer your request to that organisation within 10 working days and inform you accordingly. When you are given access to your personal information, we will advise you of your right to request correction under IPP 7.
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <strong className="text-slate-900 block font-semibold">IPP 7 — Right to Correction:</strong>
              <p>
                You have the right to request correction of any personal information we hold about you. We will respond to your correction request as soon as reasonably practicable, and in any case within 20 working days of receiving your request.
              </p>
              <p>If we agree to correct the information, we will:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>make the correction promptly; and</li>
                <li>so far as is reasonably practicable, inform every other person or organisation to whom we have disclosed the information.</li>
              </ul>
              <p>If we decline to correct the information, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>(a) provide a statement of correction (a statement of the correction sought);</li>
                <li>(b) request that we attach the statement of correction to the information so that it will always be read with it; and</li>
                <li>(c) make a complaint to the Privacy Commissioner.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2 text-xs space-y-1.5">
              <p>
                <strong className="text-slate-900">Identity Verification:</strong> Before providing access to or correcting personal information, we may need to verify your identity to ensure we are dealing with the correct individual.
              </p>
              <p>
                <strong className="text-slate-900">How to Make a Request:</strong> To make an access or correction request, please contact our Privacy Officer at{' '}
                <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] underline font-semibold">info@settlemate.co.nz</a>. You may be asked to put your request in writing.
              </p>
            </div>
          </section>

          {/* 14. NOTIFIABLE PRIVACY BREACHES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">14.</span>
              <span>NOTIFIABLE PRIVACY BREACHES (Sections 114-117)</span>
            </h2>
            <p>
              A privacy breach means an unauthorised or accidental access to, disclosure, alteration, loss, or destruction of personal information, or a temporary or permanent inability to access personal information.
            </p>
            <p>
              A notifiable privacy breach is a privacy breach that it is reasonable to believe has caused or is likely to cause serious harm to an affected individual.
            </p>
            <p>If we become aware of a notifiable privacy breach, we will:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>(a) assess the breach promptly;</li>
              <li>(b) take reasonable steps to contain and remediate it;</li>
              <li>(c) notify the Office of the Privacy Commissioner (OPC) as soon as practicable after becoming aware of the breach (our target is within 72 hours, consistent with OPC guidance); and</li>
              <li>(d) notify affected individuals as soon as practicable, unless an exception under section 116 of the Privacy Act 2020 applies or a delay is permitted under section 116(4).</li>
            </ul>
            <p className="text-xs text-slate-600">
              Where individual notification is not reasonably practicable, we will give public notice in accordance with the Privacy Regulations 2020.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Failure to notify the OPC of a notifiable privacy breach is an offence punishable by a fine of up to NZD $10,000.
            </p>
          </section>

          {/* 15. UNIQUE IDENTIFIERS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">15.</span>
              <span>UNIQUE IDENTIFIERS (IPP 13)</span>
            </h2>
            <p>
              We may assign internal account identifiers (e.g., account numbers or user IDs) to efficiently manage your account. We will only assign a unique identifier where it is necessary for our operational functions.
            </p>
            <p>We will not:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>assign you a unique identifier that has been assigned to you by another organisation (e.g., we will not use your IRD number or driver&apos;s licence number as our identifier);</li>
              <li>require you to disclose a unique identifier assigned by another organisation unless the disclosure is for a purpose connected with the purpose for which that identifier was assigned; or</li>
              <li>use your government-issued identification as our primary means of identifying you.</li>
            </ul>
            <p className="text-xs text-slate-600">
              We will take reasonable steps to: verify your identity before assigning a unique identifier; and minimise the risk of misuse of any unique identifier (e.g., by truncating account numbers in correspondence).
            </p>
          </section>

          {/* 16. AI AND AUTOMATED PROCESSING */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">16.</span>
              <span>AI AND AUTOMATED PROCESSING</span>
            </h2>
            <p>Where our website or App includes AI-powered functionality:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>AI outputs are generated automatically and are for general informational purposes only;</li>
              <li>We do not use your personal information to train AI models without your consent;</li>
              <li>We do not make solely automated decisions that produce legal or similarly significant effects for you without human review;</li>
              <li>You may contact us to request human review of any AI-assisted decision that affects you;</li>
              <li>AI processing may be performed by third-party service providers on our behalf. Where personal information is processed by AI tools, prompts may include personal information necessary for the service, and such information is handled in accordance with the Privacy Act 2020 and this Privacy Policy.</li>
            </ul>
          </section>

          {/* 17. COOKIES AND ANALYTICS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">17.</span>
              <span>COOKIES AND ANALYTICS</span>
            </h2>
            <p>Our website and App may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>remember your preferences;</li>
              <li>keep you signed in;</li>
              <li>analyse website and App performance;</li>
              <li>improve user experience;</li>
              <li>measure the effectiveness of our services.</li>
            </ul>
            <div className="space-y-1 pt-1">
              <strong className="text-slate-900 block font-semibold">Types of Cookies:</strong>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li><strong>Essential cookies:</strong> required for the website or App to function;</li>
                <li><strong>Preference cookies:</strong> remember your settings;</li>
                <li><strong>Analytics cookies:</strong> help us understand how you use our services;</li>
                <li><strong>Marketing cookies:</strong> used to deliver relevant content, only with your consent where required.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-2 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-semibold">Analytics and Third-Party SDKs:</strong>
              <p>Our App may incorporate third-party analytics tools and software development kits (SDKs) that collect usage data. Key providers include:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                <li><strong>Cloud hosting:</strong> Google Cloud Platform / Firebase (Sydney / Auckland regional clusters)</li>
                <li><strong>Analytics:</strong> First-party audit telemetry & performance monitoring</li>
                <li><strong>Email/SMS communications:</strong> Secure enterprise notification relays</li>
                <li><strong>Payment processing:</strong> Encrypted financial gateways</li>
              </ul>
              <p className="text-slate-500 pt-1">
                You can request further details about our third-party providers by contacting our Privacy Officer. You can adjust your browser settings to refuse non-essential cookies.
              </p>
            </div>
          </section>

          {/* 18. MARKETING COMMUNICATIONS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">18.</span>
              <span>MARKETING COMMUNICATIONS (UEMA 2007 Compliance)</span>
            </h2>
            <p>
              With your consent, or where otherwise permitted by law, we may send you commercial electronic messages about new services, product updates, educational content, promotions, and newsletters.
            </p>
            <div className="space-y-1">
              <strong className="text-slate-900 block font-semibold">Unsolicited Electronic Messages Act 2007 (UEMA) Compliance:</strong>
              <p>All commercial electronic messages we send will:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>clearly identify SettleMate Limited as the sender;</li>
                <li>include accurate contact details for the sender that are valid for at least 30 days after the message is sent; and</li>
                <li>include a functional, free unsubscribe facility that is clear and conspicuous, functional for at least 30 days, and allows the recipient to respond using the same method of communication.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
              <strong className="text-slate-900 block">Unsubscribe Rights:</strong>
              <p>
                You may withdraw consent to receive commercial electronic messages at any time by: (a) using the unsubscribe facility provided in each message; or (b) contacting us at <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] underline font-medium">info@settlemate.co.nz</a> or phone <span className="font-mono">022 0709159</span>. We will process unsubscribe requests within five (5) working days.
              </p>
              <p className="text-slate-500 italic pt-1">
                <strong>Essential Communications:</strong> Opting out of marketing does not stop non-promotional service, account, security, or legal compliance messages.
              </p>
            </div>
          </section>

          {/* 19. CHILDREN'S PRIVACY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">19.</span>
              <span>CHILDREN&apos;S PRIVACY</span>
            </h2>
            <p>
              Our services are intended for individuals aged 18 years and older. We do not knowingly allow users under 18 to create accounts or use our services.
            </p>
            <p>
              We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without appropriate parental or guardian authority, we will take reasonable steps to delete the information.
            </p>
            <p className="text-xs text-slate-600">
              <strong className="text-slate-900">Representative Requests:</strong> For the purposes of privacy breach notification, a parent, legal guardian, or caregiver of a child under 16 may act as a representative. For access and correction requests under IPP 6 and IPP 7, a representative may make a request on behalf of a child where the child is too young to act on their own behalf, or where an older child or young person has authorised them to do so.
            </p>
          </section>

          {/* 20. THIRD-PARTY WEBSITES AND LINKS */}
          <section className="pt-6 space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">20.</span>
              <span>THIRD-PARTY WEBSITES AND LINKS</span>
            </h2>
            <p>
              Our website or App may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies before providing personal information.
            </p>
          </section>

          {/* 21. CHANGES TO THIS PRIVACY POLICY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">21.</span>
              <span>CHANGES TO THIS PRIVACY POLICY</span>
            </h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>
              <strong className="text-slate-900">Material Changes:</strong> Where a change is material, we will provide at least thirty (30) days&apos; notice before the change takes effect. Notice will be provided by email, in-app notification, or prominent notice on our website. The updated version will take effect from the date specified at the top of this Policy.
            </p>
            <p className="text-xs text-slate-600">
              <strong className="text-slate-900">Non-Material Changes:</strong> We may make non-material changes (e.g., corrections of typographical errors or updates to contact details) without prior notice.
            </p>
          </section>

          {/* 22. COMPLAINTS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">22.</span>
              <span>COMPLAINTS</span>
            </h2>
            <p>
              If you have a concern about how we have handled your personal information, please contact our Privacy Officer at <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] font-semibold underline">info@settlemate.co.nz</a>. We will investigate and respond to your complaint promptly.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-900">Office of the Privacy Commissioner (New Zealand):</p>
              <p>If you are not satisfied with our response, you have the right to make a complaint to the Office of the Privacy Commissioner:</p>
              <div className="pt-1 font-mono text-slate-700 space-y-0.5">
                <div>Website: <a href="https://www.privacy.org.nz" target="_blank" rel="noreferrer" className="text-[#de5d26] underline">www.privacy.org.nz</a></div>
                <div>Email: enquiries@privacy.org.nz</div>
                <div>Phone: 0800 803 909</div>
              </div>
            </div>
          </section>

          {/* 23. CONTACT US */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">23.</span>
              <span>CONTACT US</span>
            </h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact:
            </p>
            
            <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-slate-900 text-base">Privacy Officer</div>
              <div className="font-semibold text-slate-800">SettleMate Limited</div>
              <div className="space-y-1 text-slate-700">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#de5d26] flex-shrink-0" />
                  <span>Email: <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] font-medium underline">info@settlemate.co.nz</a></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#de5d26] flex-shrink-0" />
                  <span>Website: <a href="https://www.settlemate.co.nz" target="_blank" rel="noreferrer" className="text-[#de5d26] font-medium underline">https://www.settlemate.co.nz</a></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#de5d26] flex-shrink-0" />
                  <span>Phone: <span className="font-mono">022 0709159</span></span>
                </div>
                <div className="flex items-start space-x-2 pt-1">
                  <Building2 className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                  <span>Registered Office: 36c whitford road, Botany Downs, Auckland 2014, New Zealand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-[#de5d26] flex-shrink-0" />
                  <span>NZBN: <span className="font-mono font-bold text-slate-900">9429053930149</span></span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer info & Cross Navigation */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 print:hidden">
          <p>© 2026 SettleMate Limited (New Zealand). All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate && onNavigate('cookies')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Cookie Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate && onNavigate('csa')}
              className="text-[#de5d26] font-bold hover:underline cursor-pointer"
              title="Customer Service Agreement"
            >
              CSA
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate && onNavigate('disclaimer')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Disclaimer
            </button>
            <span>•</span>
            <button
              onClick={onBack}
              className="text-slate-600 font-medium hover:underline cursor-pointer"
            >
              Back to App
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
