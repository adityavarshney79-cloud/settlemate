/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  FileText, 
  Printer, 
  Cpu, 
  ExternalLink, 
  Building2, 
  Calculator, 
  HelpCircle,
  Mail,
  Phone,
  Compass
} from 'lucide-react';

interface DisclaimerProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export default function Disclaimer({ onBack, onNavigate }: DisclaimerProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800" id="disclaimer-page">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header navigation & title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 print:hidden">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-[#de5d26] transition mb-3 cursor-pointer"
              id="back-from-disclaimer-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Website & App Disclaimer</h1>
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
              title="Print Disclaimer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <span className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
              Legal Disclaimer v1.0
            </span>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block text-center pb-6 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-slate-900">SETTLEMATE LIMITED — WEBSITE & APP DISCLAIMER</h1>
          <p className="text-sm text-slate-600 mt-1">Version: 1.0 • Effective Date: 14th September, 2026</p>
          <p className="text-xs text-slate-500">Prepared for SettleMate Limited (New Zealand) • NZBN: 9429053930149</p>
        </div>

        {/* High-visibility Warning Notice */}
        <div className="p-5 bg-gradient-to-r from-amber-50/80 to-orange-50/60 border border-amber-200 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-700 space-y-2.5">
          <p className="font-bold text-slate-900 flex items-center space-x-2 text-sm sm:text-base">
            <Scale className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>General Information Only — Independent Coordination Platform</span>
          </p>
          <p>
            SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides an independent home-buying coordination and referral platform. SettleMate is not a law firm, financial adviser, mortgage lender, property valuer, building inspector, or real estate agency.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-1 font-mono">
            <span>Effective Date: 14th September, 2026</span>
            <span>•</span>
            <span>Last Updated: 14th September, 2026</span>
            <span>•</span>
            <span>Jurisdiction: New Zealand</span>
          </div>
        </div>

        {/* Disclaimer Document Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">

          {/* 1. PURPOSE AND SCOPE */}
          <section className="pt-6 first:pt-0 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">1.</span>
              <span>PURPOSE AND SCOPE</span>
            </h2>
            <p>
              This Disclaimer applies to your use of the SettleMate Limited (&quot;SettleMate&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) website, mobile application (&quot;App&quot;), online portal, AI-powered features, checklists, guides, calculators, tools, and all related digital services (collectively, the &quot;Digital Services&quot;).
            </p>
            <p>This Disclaimer forms part of, and should be read alongside, our:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('csa')}
                  className="text-[#de5d26] font-medium underline hover:text-[#c84617] cursor-pointer"
                >
                  Customer Service Agreement (CSA v3.0)
                </button>{' '}
                and Website &amp; Mobile App Terms and Conditions (v2.0 or as updated from time to time) (&quot;Terms&quot;);
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('privacy')}
                  className="text-[#de5d26] font-medium underline hover:text-[#c84617] cursor-pointer"
                >
                  Privacy Policy (v2.0 or as updated from time to time)
                </button>;
              </li>
              <li>Cookie Policy (v1.0 or as updated from time to time).</li>
            </ul>
            <p className="text-slate-600 italic">
              If there is any inconsistency between this Disclaimer and the Terms, the Terms prevail unless this Disclaimer gives you greater statutory protection under New Zealand law.
            </p>
          </section>

          {/* 2. GENERAL INFORMATION ONLY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">2.</span>
              <span>GENERAL INFORMATION ONLY</span>
            </h2>
            <p>
              All information, content, tools, checklists, guides, calculators, and materials provided through the Digital Services are for general informational purposes only.
            </p>
            <p className="font-semibold text-slate-900">They do not constitute:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>legal advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>financial advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>mortgage or lending advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>insurance advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>tax advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>accounting advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>valuation advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>engineering or building inspection advice;</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>real estate agency advice; or</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>any other professional advice regulated under NZ law.</span>
              </div>
            </div>
            <p className="text-slate-600">
              The information provided is general in nature and is not tailored to your specific circumstances, objectives, or needs.
            </p>
          </section>

          {/* 3. SETTLEMATE'S ROLE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">3.</span>
              <span>SETTLEMATE&apos;S ROLE</span>
            </h2>
            <p>
              SettleMate is an independent home-buying coordination and referral platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-2">
                <h3 className="font-bold text-emerald-900 text-xs sm:text-sm">Our role is limited to:</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                  <li>organising communications;</li>
                  <li>coordinating service providers;</li>
                  <li>tracking milestones;</li>
                  <li>assisting with administrative processes;</li>
                  <li>providing reminders;</li>
                  <li>facilitating introductions to independent professionals.</li>
                </ul>
              </div>

              <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 space-y-2">
                <h3 className="font-bold text-rose-900 text-xs sm:text-sm">SettleMate is not:</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                  <li>a law firm;</li>
                  <li>a real estate agency;</li>
                  <li>a financial adviser;</li>
                  <li>a mortgage adviser;</li>
                  <li>an insurance adviser;</li>
                  <li>a property valuer;</li>
                  <li>a building inspector;</li>
                  <li>a tax adviser;</li>
                  <li>an accountant;</li>
                  <li>a conveyancer.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. NO PROFESSIONAL-CLIENT RELATIONSHIP */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">4.</span>
              <span>NO PROFESSIONAL-CLIENT RELATIONSHIP</span>
            </h2>
            <p>
              Your use of the Digital Services, including any AI-powered features, checklists, calculators, guides, or tools, does not create:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>a solicitor-client relationship;</li>
              <li>an adviser-client relationship;</li>
              <li>an agency relationship;</li>
              <li>a fiduciary relationship; or</li>
              <li>any other professional-client relationship</li>
            </ul>
            <p>
              between you and SettleMate or any of its directors, employees, contractors, or referral partners.
            </p>
            <p className="font-semibold text-slate-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              No content on the Digital Services should be treated as a substitute for independent professional advice.
            </p>
          </section>

          {/* 5. INDEPENDENT ADVICE REQUIRED */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">5.</span>
              <span>INDEPENDENT ADVICE REQUIRED</span>
            </h2>
            <p>
              You must consult appropriately qualified and licensed professionals before making any decisions relating to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>purchasing, selling, or investing in property;</li>
              <li>obtaining finance or mortgages;</li>
              <li>legal obligations, contracts, or property transactions;</li>
              <li>insurance coverage;</li>
              <li>taxation;</li>
              <li>property valuations or appraisals;</li>
              <li>building or pest inspections;</li>
              <li>any other aspect of a property transaction.</li>
            </ul>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <p className="font-bold text-slate-900">SettleMate strongly encourages you to:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>verify the qualifications, licences, and insurance of any professional you engage;</li>
                <li>obtain advice in writing where appropriate;</li>
                <li>review all documentation carefully before signing.</li>
              </ul>
            </div>
          </section>

          {/* 6. USER RESPONSIBILITY AND NO RELIANCE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">6.</span>
              <span>USER RESPONSIBILITY AND NO RELIANCE</span>
            </h2>
            <p>
              All decisions relating to your property purchase remain solely your responsibility. SettleMate does not:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>make purchasing decisions on your behalf;</li>
              <li>assess the suitability or affordability of any property;</li>
              <li>determine your borrowing capacity;</li>
              <li>negotiate prices or contracts;</li>
              <li>execute documents on your behalf;</li>
              <li>provide recommendations on whether to proceed with any transaction.</li>
            </ul>
            <p className="font-semibold text-slate-900">
              You agree not to rely solely on the Digital Services when making decisions about your property purchase, finance, legal, insurance, or settlement matters.
            </p>
          </section>

          {/* 7. PROPERTY, FINANCE, AND SETTLEMENT INFORMATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">7.</span>
              <span>PROPERTY, FINANCE, AND SETTLEMENT INFORMATION</span>
            </h2>
            <p>
              Any information provided through the Digital Services relating to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>property prices, market trends, or comparable sales;</li>
              <li>interest rates, lending criteria, or borrowing capacity;</li>
              <li>settlement dates, timelines, or milestones;</li>
              <li>legal processes or requirements;</li>
              <li>insurance options;</li>
              <li>council regulations or zoning;</li>
              <li>tax implications;</li>
            </ul>
            <p>
              is indicative only and may be incomplete, inaccurate, or outdated. Property markets, lending policies, interest rates, and legal requirements change frequently.
            </p>
            <p className="font-medium text-slate-900">
              You must independently verify all such information with qualified professionals and relevant authorities before acting on it.
            </p>
          </section>

          {/* 8. AI-POWERED FEATURES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">8.</span>
              <span>AI-POWERED FEATURES</span>
            </h2>
            <p>Where the Digital Services include AI-powered functionality:</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-start space-x-2 text-slate-700">
                <Cpu className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                <p>AI outputs are generated automatically by algorithmic processes and may be incomplete, inaccurate, outdated, or reflect biases;</p>
              </div>
              <div className="flex items-start space-x-2 text-slate-700">
                <Cpu className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                <p>AI outputs are for general informational purposes only and must not be relied upon as professional advice;</p>
              </div>
              <div className="flex items-start space-x-2 text-slate-700">
                <Cpu className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                <p>AI outputs do not constitute regulated advice under New Zealand law;</p>
              </div>
              <div className="flex items-start space-x-2 text-slate-700">
                <Cpu className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                <p>You must independently verify any AI-generated information, recommendations, summaries, or checklists before relying on them;</p>
              </div>
              <div className="flex items-start space-x-2 text-slate-700">
                <Cpu className="w-4 h-4 text-[#de5d26] flex-shrink-0 mt-0.5" />
                <p>SettleMate excludes all liability for any loss, damage, delay, or expense resulting from your reliance on AI-generated outputs.</p>
              </div>
            </div>
          </section>

          {/* 9. THIRD-PARTY SERVICES, PARTNERS, AND EXTERNAL LINKS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">9.</span>
              <span>THIRD-PARTY SERVICES, PARTNERS, AND EXTERNAL LINKS</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                SettleMate may introduce or refer you to independent third-party professionals (&quot;Partners&quot;), including mortgage advisers, lawyers, real estate agents, insurers, building inspectors, valuers, and movers.
              </li>
              <li>
                Every Partner introduced through SettleMate is an independent business and contractor, not an employee, agent, or representative of SettleMate.
              </li>
              <li>
                SettleMate does not endorse, warrant, guarantee, or supervise the services, advice, qualifications, pricing, or outcomes provided by any Partner.
              </li>
              <li>
                SettleMate does not conduct background checks, competency assessments, or quality audits of Partners unless expressly stated in writing. You are solely responsible for conducting your own due diligence.
              </li>
              <li>
                Any contract or engagement you enter into with a Partner is solely between you and that Partner. SettleMate has no liability for any dispute, negligence, financial loss, breach of contract, or damage arising from your dealings with a Partner.
              </li>
              <li>
                The Digital Services may contain links to third-party websites or services. SettleMate is not responsible for the content, privacy practices, terms, or availability of any third-party websites.
              </li>
            </ul>
          </section>

          {/* 10. CALCULATORS, ESTIMATES, AND TOOLS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">10.</span>
              <span>CALCULATORS, ESTIMATES, AND TOOLS</span>
            </h2>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p>
                Any calculators, financial modeling tools, settlement timelines, or milestone estimation features provided through the Digital Services are provided for indicative illustrative purposes only.
              </p>
              <p>
                Calculations and estimates are based on generic assumptions and user-entered inputs, which may not reflect real-world lending criteria, bank stress tests, fees, taxes, rate changes, or settlement conditions.
              </p>
              <p className="font-semibold text-slate-900">
                Calculations do not represent a loan offer, pre-approval, legal commitment, or binding quotation.
              </p>
              <p className="text-xs text-slate-600">
                You should never rely on calculators or automated tools to make binding financial commitments. Always seek advice from a licensed Financial Advice Provider (FAP) or Mortgage Adviser.
              </p>
            </div>
          </section>

          {/* 11. ACCURACY, COMPLETENESS, AND CURRENCY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">11.</span>
              <span>ACCURACY, COMPLETENESS, AND CURRENCY</span>
            </h2>
            <p>
              While SettleMate endeavors to keep information current and accurate, we make no representations, warranties, or guarantees (express or implied) that the content on the Digital Services is accurate, complete, up-to-date, reliable, error-free, or suitable for any particular purpose.
            </p>
            <p className="text-slate-600">
              Information may be updated, amended, or withdrawn at any time without prior notice.
            </p>
          </section>

          {/* 12. AVAILABILITY AND SERVICE CONTINUITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">12.</span>
              <span>AVAILABILITY AND SERVICE CONTINUITY</span>
            </h2>
            <p>
              SettleMate does not warrant that the Digital Services will be uninterrupted, error-free, secure, or free from viruses, bugs, or technical faults.
            </p>
            <p className="text-slate-600">
              We may suspend, withdraw, or restrict the availability of all or any part of our Digital Services for business, maintenance, or operational reasons at any time without liability.
            </p>
          </section>

          {/* 13. LIMITATION OF LIABILITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">13.</span>
              <span>LIMITATION OF LIABILITY</span>
            </h2>
            <p>
              To the maximum extent permitted by New Zealand law (including the Contract and Commercial Law Act 2017):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong className="text-slate-800">Excluded Losses:</strong> SettleMate excludes all liability for any indirect, consequential, special, incidental, punitive, or exemplary loss or damages;
              </li>
              <li>
                <strong className="text-slate-800">Transactional Losses:</strong> SettleMate excludes all liability for lost profits, loss of opportunity, loss of reputation, emotional distress, financing delays, failed finance applications, failed property transactions, missed deadlines, or market value fluctuations;
              </li>
              <li>
                <strong className="text-slate-800">Liability Cap:</strong> Where liability cannot be excluded by law, SettleMate&apos;s total aggregate liability arising out of or in connection with your use of the Digital Services is strictly limited to the amount you paid SettleMate in the preceding twelve (12) months, or NZD $100 (whichever is less).
              </li>
            </ul>
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 mt-2">
              <p className="font-semibold text-slate-900 text-xs sm:text-sm">Consumer Legislation (CGA &amp; FTA):</p>
              <p className="text-xs text-slate-700 mt-1">
                If you are using the Digital Services in trade, you agree that the Consumer Guarantees Act 1993 (CGA) and sections 9, 12A, and 13 of the Fair Trading Act 1986 (FTA) do not apply to the extent permitted by law. If you are a consumer under the CGA, nothing in this Disclaimer excludes or limits your non-excludable statutory rights under New Zealand consumer law.
              </p>
            </div>
          </section>

          {/* 14. INDEMNITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">14.</span>
              <span>INDEMNITY</span>
            </h2>
            <p>
              You agree to indemnify and hold harmless SettleMate, its directors, officers, employees, contractors, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including legal fees on a solicitor-client basis) arising out of or in connection with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>your breach of this Disclaimer or our Terms;</li>
              <li>your misuse of the Digital Services;</li>
              <li>your reliance on any information, tools, or AI features contrary to this Disclaimer;</li>
              <li>your dispute with any third-party Partner or service provider.</li>
            </ul>
          </section>

          {/* 15. JURISDICTION AND GOVERNING LAW */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">15.</span>
              <span>JURISDICTION AND GOVERNING LAW</span>
            </h2>
            <p>
              This Disclaimer and any dispute or claim arising out of or in connection with it or its subject matter shall be governed by and construed in accordance with the laws of New Zealand.
            </p>
            <p className="text-slate-600">
              You irrevocably agree that the courts of New Zealand have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with this Disclaimer or your use of the Digital Services.
            </p>
          </section>

          {/* 16. CONTACT DETAILS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="text-[#de5d26] font-bold">16.</span>
              <span>CONTACT DETAILS</span>
            </h2>
            <p>If you have any questions, feedback, or concerns regarding this Disclaimer, please contact SettleMate:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                  <Building2 className="w-4 h-4 text-[#de5d26]" />
                  <span>SettleMate Limited (New Zealand)</span>
                </div>
                <p className="text-slate-600 pl-6">NZBN: 9429053930149</p>
                <p className="text-slate-600 pl-6">Auckland, New Zealand</p>
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
                  <span className="text-slate-600 font-mono">+64 022 0709 159</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800">
                  <Compass className="w-4 h-4 text-[#de5d26]" />
                  <span className="text-slate-600">settlemate.co.nz</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer info & navigation within Disclaimer */}
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
              onClick={() => onNavigate && onNavigate('cookies')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => onNavigate && onNavigate('csa')}
              className="hover:text-[#de5d26] underline font-semibold text-[#de5d26] cursor-pointer"
            >
              CSA
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
