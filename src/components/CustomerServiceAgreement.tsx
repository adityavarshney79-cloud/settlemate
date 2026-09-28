/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Printer, 
  AlertTriangle, 
  Scale, 
  Mail, 
  Phone, 
  Building2,
  Lock,
  ExternalLink
} from 'lucide-react';

interface CustomerServiceAgreementProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export default function CustomerServiceAgreement({ onBack, onNavigate }: CustomerServiceAgreementProps) {
  const [businessPurposeChecked, setBusinessPurposeChecked] = useState(false);
  const [referralFeeChecked, setReferralFeeChecked] = useState(true);
  const [electronicCommChecked, setElectronicCommChecked] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800" id="csa-page">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Navigation & Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 print:hidden">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-[#de5d26] transition mb-3 cursor-pointer"
              id="back-from-csa-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 text-[#de5d26]">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Customer Service Agreement
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Version 3.0 (Legally Enhanced) • Prepared for SettleMate Limited (New Zealand)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              title="Print Agreement"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              NZ Law Enforceable
            </span>
          </div>
        </div>

        {/* Print-only title */}
        <div className="hidden print:block text-center pb-6 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-slate-900">SettleMate Customer Service Agreement</h1>
          <p className="text-sm text-slate-600 mt-1">Version 3.0 (Legally Enhanced)</p>
          <p className="text-xs text-slate-500">Prepared for SettleMate Limited (New Zealand)</p>
        </div>

        {/* Executive Scope Notice Card */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50/80 to-slate-50 border border-orange-200 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-700 space-y-2">
          <p className="font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#de5d26] flex-shrink-0" />
            <span>Official SettleMate Customer Terms & Coordination Framework</span>
          </p>
          <p className="text-xs text-slate-600">
            This Agreement governs the provision of independent home-buying coordination, referral, and settlement support services by SettleMate Limited. Please review this document thoroughly.
          </p>
        </div>

        {/* Document Body */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">

          {/* PART A – DEFINITIONS */}
          <section className="pt-6 first:pt-0 space-y-3">
            <h2 className="text-base font-bold text-slate-900 text-[#de5d26] uppercase tracking-wide">
              PART A – DEFINITIONS
            </h2>
            <p>For the purposes of this Agreement:</p>
            <div className="space-y-2 pl-2">
              <p>
                <strong className="text-slate-900">Agreement</strong> means this Customer Service Agreement together with any schedules, quotations, policies and documents incorporated by reference.
              </p>
              <p>
                <strong className="text-slate-900">Business Day</strong> means any day other than Saturday, Sunday or a public holiday in New Zealand.
              </p>
              <p>
                <strong className="text-slate-900">Client</strong> means the individual or entity purchasing or using SettleMate&apos;s services.
              </p>
              <p>
                <strong className="text-slate-900">Partner</strong> means any independent third-party professional or business introduced by SettleMate, including but not limited to mortgage advisers, real estate agents, lawyers, insurers, valuers, builders, movers, utility providers, tradespeople and other service providers.
              </p>
              <p>
                <strong className="text-slate-900">Services</strong> means the coordination, administration, communication, referral and home-buying support services provided by SettleMate.
              </p>
            </div>
          </section>

          {/* PART B – NATURE OF SERVICES */}
          <section className="pt-6 space-y-4">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART B – NATURE OF SERVICES
            </h2>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">1. Independent Coordination Service</h3>
              <p>SettleMate is an independent home-buying coordination company.</p>
              <p>Our role is to simplify and coordinate the home-buying journey by:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Organizing communications;</li>
                <li>Coordinating service providers;</li>
                <li>Tracking milestones;</li>
                <li>Assisting with administrative processes;</li>
                <li>Providing reminders;</li>
                <li>Facilitating introductions to independent professionals.</li>
              </ul>
              <p className="font-semibold text-slate-800">
                SettleMate does not replace any licensed professional engaged during the property transaction.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-slate-900">2. Services Specifically Excluded</h3>
              <p>Unless expressly agreed in writing, SettleMate does not:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 py-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="flex items-center text-slate-700">• Provide legal advice</span>
                <span className="flex items-center text-slate-700">• Provide financial advice</span>
                <span className="flex items-center text-slate-700">• Provide mortgage advice</span>
                <span className="flex items-center text-slate-700">• Provide insurance advice</span>
                <span className="flex items-center text-slate-700">• Provide tax advice</span>
                <span className="flex items-center text-slate-700">• Provide engineering advice</span>
                <span className="flex items-center text-slate-700">• Provide valuation services</span>
                <span className="flex items-center text-slate-700">• Negotiate property prices</span>
                <span className="flex items-center text-slate-700">• Negotiate contracts</span>
                <span className="flex items-center text-slate-700">• Prepare legal documents</span>
                <span className="flex items-center text-slate-700">• Hold trust money</span>
                <span className="flex items-center text-slate-700">• Receive settlement funds</span>
                <span className="flex items-center text-slate-700">• Execute documents on behalf of clients</span>
                <span className="flex items-center text-slate-700">• Make purchasing decisions</span>
              </div>
            </div>
          </section>

          {/* PART C – CUSTOMER ACKNOWLEDGEMENTS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART C – CUSTOMER ACKNOWLEDGEMENTS
            </h2>
            <p>The Client acknowledges that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Purchasing residential property involves financial and legal risk;</li>
              <li>Final decisions remain solely the Client&apos;s responsibility;</li>
              <li>SettleMate only assists with coordination;</li>
              <li>All professional advice must be obtained directly from qualified advisers.</li>
            </ul>
            <p className="font-semibold text-slate-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-amber-900">
              The Client agrees not to rely upon SettleMate as a substitute for independent professional advice.
            </p>
          </section>

          {/* PART D – REFERRAL DISCLOSURE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART D – REFERRAL DISCLOSURE
            </h2>
            <p>SettleMate may maintain referral relationships with selected Partners. These relationships may include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Referral fees;</li>
              <li>Marketing arrangements;</li>
              <li>Commission payments;</li>
              <li>Reciprocal referrals.</li>
            </ul>
            <p className="pt-2">The Client acknowledges that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Referrals are made in good faith;</li>
              <li>Referral arrangements may generate income for SettleMate;</li>
              <li>SettleMate does not guarantee the quality, pricing, availability or outcome of any Partner&apos;s services;</li>
              <li>The Client remains free to choose any provider and is under no obligation to use a referred Partner.</li>
            </ul>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5 mt-2">
              <p className="font-bold text-slate-900">Specific Disclosure:</p>
              <p>
                SettleMate may receive referral fees, commissions or other benefits from Partners. These payments may be:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                <li>(a) fixed amounts;</li>
                <li>(b) percentage-based fees;</li>
                <li>(c) contingent upon the Client entering into a contract with a Partner;</li>
                <li>(d) contingent upon settlement of a property transaction.</li>
              </ul>
              <p className="text-xs text-slate-600 italic pt-1">
                The nature and approximate value of any referral arrangement will be disclosed to the Client upon request.
              </p>
            </div>
          </section>

          {/* PART E – THIRD-PARTY LIABILITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART E – THIRD-PARTY LIABILITY
            </h2>
            <p>Every Partner introduced through SettleMate operates as an independent business. SettleMate:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>is not the agent of any Partner;</li>
              <li>does not supervise any Partner;</li>
              <li>is not responsible for professional negligence by any Partner;</li>
              <li>is not liable for financial loss arising from services provided by a Partner;</li>
              <li>does not warrant the accuracy of advice given by a Partner.</li>
            </ul>
            <p>Any dispute regarding work performed by a Partner must be resolved directly between the Client and that Partner.</p>
            <div className="space-y-2 pt-2">
              <p>
                <strong className="text-slate-900">No Duty to Vet:</strong> SettleMate does not warrant that it has conducted any due diligence, background checks, or competency assessments of any Partner. The Client is responsible for satisfying themselves as to the suitability, qualifications, and insurance coverage of any Partner before engaging their services.
              </p>
              <p>
                <strong className="text-slate-900">Independent Contractor Status:</strong> Each Partner is an independent contractor and not an employee, agent, or joint ventures of SettleMate.
              </p>
            </div>
          </section>

          {/* PART F – CLIENT OBLIGATIONS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART F – CLIENT OBLIGATIONS
            </h2>
            <p>The Client agrees to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and complete information;</li>
              <li>Notify SettleMate of any material changes;</li>
              <li>Review all documentation before signing;</li>
              <li>Meet all lender and legal deadlines;</li>
              <li>Attend scheduled appointments;</li>
              <li>Maintain respectful communications with SettleMate staff and Partners.</li>
            </ul>
            <p className="font-medium text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
              Failure to comply may result in delays for which SettleMate accepts no responsibility.
            </p>
          </section>

          {/* PART G – LIMITATION OF LIABILITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART G – LIMITATION OF LIABILITY
            </h2>
            <p className="font-semibold text-slate-800">To the fullest extent permitted by New Zealand law:</p>
            
            <div className="space-y-1.5">
              <p><strong className="text-slate-900">Excluded Liabilities:</strong> SettleMate excludes liability for:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4 text-xs text-slate-600">
                <span>• Indirect loss</span>
                <span>• Consequential loss</span>
                <span>• Lost profits</span>
                <span>• Emotional distress</span>
                <span>• Loss of opportunity</span>
                <span>• Financing delays</span>
                <span>• Failed finance applications</span>
                <span>• Unsuccessful property purchases</span>
                <span>• Settlement delays</span>
                <span>• Market fluctuations</span>
                <span>• Changes in lending policy</span>
                <span>• Changes in government regulations</span>
                <span className="sm:col-span-2">• Actions or omissions of third parties</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <p>
                <strong className="text-slate-900">Liability Cap:</strong> Where liability cannot lawfully be excluded, SettleMate&apos;s total aggregate liability for any claim arising out of or connected with the Services shall be limited to the lesser of:
              </p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(a) the total fees paid by the Client to SettleMate during the preceding twelve (12) months; or</li>
                <li>(b) NZD $5,000.</li>
              </ul>
            </div>

            <div className="space-y-1.5 pt-2">
              <p><strong className="text-slate-900">Carve-Outs:</strong> This limitation does not apply to liability for:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(i) death or personal injury caused by SettleMate&apos;s negligence;</li>
                <li>(ii) fraud or fraudulent misrepresentation;</li>
                <li>(iii) any liability under the Consumer Guarantees Act 1993 that cannot lawfully be excluded or limited;</li>
                <li>(iv) any other liability that cannot lawfully be excluded or limited under New Zealand law.</li>
              </ul>
            </div>

            <p className="pt-2 text-xs text-slate-600">
              <strong className="text-slate-900">Reasonableness Acknowledgment:</strong> The Client acknowledges that the limitations and exclusions in this clause are reasonable and reflect the allocation of risk between the parties, having regard to the nature of the Services and the fees charged.
            </p>
            <p className="text-xs text-slate-600">
              This limitation applies whether the claim arises in contract, tort (including negligence), equity or otherwise, to the extent permitted by law.
            </p>
          </section>

          {/* PART H – CONSUMER GUARANTEES ACT 1993 */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART H – CONSUMER GUARANTEES ACT 1993
            </h2>
            <p>
              Nothing in this Agreement excludes, restricts or modifies any rights that the Client may have under the Consumer Guarantees Act 1993 (CGA) where that Act applies and cannot lawfully be contracted out of.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
              <p>
                <strong className="text-slate-900">Business Purpose Acknowledgment:</strong> If the Client acquires the Services wholly or principally for the purposes of a business (as defined in section 2 of the CGA), the Client expressly acknowledges in writing that:
              </p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(a) the Client is acquiring the Services for business purposes; and</li>
                <li>(b) the parties agree that the provisions of the CGA shall not apply to the Services to the extent permitted by law.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-600 italic">
              For the avoidance of doubt, where the Client is a natural person acquiring the Services otherwise than for business purposes, no contracting out of the CGA is attempted or permitted.
            </p>
          </section>

          {/* PART I – FAIR TRADING ACT 1986 */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART I – FAIR TRADING ACT 1986
            </h2>
            <p>SettleMate will comply with the Fair-Trading Act 1986.</p>
            <p>The Client acknowledges that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>promotional material is general information;</li>
              <li>examples shown are illustrative only;</li>
              <li>testimonials represent individual experiences;</li>
              <li>no guarantee is made regarding finance approval, settlement dates or property outcomes.</li>
            </ul>
          </section>

          {/* PART J – PRIVACY AND DATA SECURITY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART J – PRIVACY AND DATA SECURITY
            </h2>
            <p>
              SettleMate collects, stores and processes personal information in accordance with the Privacy Act 2020. Information may include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4 text-xs text-slate-600">
              <span>• identity information</span>
              <span>• contact details</span>
              <span>• property information</span>
              <span>• lender information</span>
              <span>• legal representative details</span>
              <span>• transaction milestones</span>
              <span className="sm:col-span-2">• communication records</span>
            </div>
            <p>
              SettleMate will implement reasonable administrative, physical and technical safeguards to protect personal information, including encrypted storage where appropriate, role-based access controls, secure authentication measures and routine system monitoring.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
              <p><strong className="text-slate-900">Privacy Breach Notification:</strong> In the event of a notifiable privacy breach (as defined in the Privacy Act 2020), SettleMate will:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(a) notify the Office of the Privacy Commissioner as soon as practicable after becoming aware of the breach;</li>
                <li>(b) notify affected individuals as soon as practicable, unless an exception under section 116 of the Privacy Act 2020 applies;</li>
                <li>(c) where individual notification is not reasonably practicable, give public notice in accordance with the Privacy Regulations 2020.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-600">
              SettleMate&apos;s Privacy Policy, available at <span className="text-[#de5d26] font-medium underline">www.settlemate.co.nz</span>, contains further details about how personal information is handled, including the Client&apos;s rights to access and correct personal information.
            </p>
          </section>

          {/* PART K – ELECTRONIC COMMUNICATIONS */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART K – ELECTRONIC COMMUNICATIONS
            </h2>
            <p>
              The Client consents to receiving communications electronically, including commercial electronic messages as defined in the Unsolicited Electronic Messages Act 2007.
            </p>
            <p>Electronic communications include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>email: <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] font-medium underline">info@settlemate.co.nz</a></li>
              <li>SMS: <span className="font-mono">+64 022 0709 159</span></li>
              <li>in-app notifications;</li>
              <li>secure portal messages;</li>
              <li>electronic document delivery.</li>
            </ul>
            <p>Electronic records are deemed received when successfully transmitted unless the sender receives notice of delivery failure.</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <p>
                <strong className="text-slate-900">Unsubscribe Rights:</strong> The Client may withdraw consent to receive commercial electronic messages at any time by using the unsubscribe facility provided in each message or by contacting SettleMate at <a href="mailto:info@settlemate.co.nz" className="text-[#de5d26] font-medium underline">info@settlemate.co.nz</a>. SettleMate will process such requests within five (5) Business Days.
              </p>
            </div>
          </section>

          {/* PART L – ELECTRONIC SIGNATURES */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART L – ELECTRONIC SIGNATURES
            </h2>
            <p>
              The Client agrees that electronic signatures, digital acceptance, click-wrap acceptance, checkbox acknowledgements and electronic authentication methods have the same legal effect as handwritten signatures to the extent permitted by the Contract and Commercial Law Act 2017.
            </p>
            <p>For an electronic signature to be valid under New Zealand law, it must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) adequately identify the signatory;</li>
              <li>(b) adequately indicate the signatory&apos;s approval of the information to which the signature relates; and</li>
              <li>(c) be as reliable as is appropriate given the purpose for which, and the circumstances in which, the signature is required.</li>
            </ul>
            <p>
              The Client consents to receiving electronic signatures and agrees that contracts formed electronically shall not be denied enforceability solely because they are in electronic form.
            </p>
          </section>

          {/* PART M – INTELLECTUAL PROPERTY */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART M – INTELLECTUAL PROPERTY
            </h2>
            <p>All intellectual property belonging to SettleMate remains the exclusive property of SettleMate. This includes:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pl-4 text-xs text-slate-600">
              <span>• software</span>
              <span>• mobile applications</span>
              <span>• branding</span>
              <span>• logos</span>
              <span>• checklists</span>
              <span>• templates</span>
              <span>• educational materials</span>
              <span>• workflows</span>
              <span>• guides</span>
              <span>• graphics</span>
              <span>• documents</span>
            </div>
            <p className="pt-1">
              Clients may not copy, modify, distribute, publish or commercially exploit any SettleMate material without prior written consent.
            </p>
          </section>

          {/* PART N – DISPUTE RESOLUTION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART N – DISPUTE RESOLUTION
            </h2>
            <p>If a dispute arises:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) the parties will first attempt to resolve the matter through good-faith discussions within ten (10) Business Days of written notice of the dispute;</li>
              <li>(b) if unresolved within twenty (20) Business Days, either party may refer the dispute to mediation in New Zealand under the NZ Dispute Resolution Centre Mediation Rules (or such other mediation rules as the parties agree);</li>
              <li>(c) mediation costs shall be shared equally between the parties unless otherwise agreed;</li>
              <li>(d) if mediation fails, either party may commence proceedings before a court of competent jurisdiction in New Zealand.</li>
            </ul>
            <p className="text-xs text-slate-600 italic">
              Nothing in this clause prevents either party from seeking urgent interim relief where necessary.
            </p>
          </section>

          {/* PART O – TERMINATION */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART O – TERMINATION
            </h2>
            <p>SettleMate may terminate this Agreement immediately where:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>payment remains overdue after notice;</li>
              <li>fraudulent information is supplied;</li>
              <li>abusive or threatening behaviour occurs;</li>
              <li>unlawful activity is suspected;</li>
              <li>continuing the engagement would expose SettleMate to legal or reputational risk.</li>
            </ul>
            <p>Termination does not affect rights or obligations that accrued before termination.</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 mt-2">
              <p><strong className="text-slate-900">Effect of Termination:</strong> Upon termination:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(a) SettleMate will cease providing Services immediately;</li>
                <li>(b) the Client remains liable for all fees accrued up to the date of termination;</li>
                <li>(c) SettleMate may, at its discretion, refund any prepaid fees for Services not yet rendered, less reasonable administrative costs;</li>
                <li>(d) clauses relating to intellectual property, limitation of liability, privacy, and governing law shall survive termination.</li>
              </ul>
            </div>
          </section>

          {/* PART P – FORCE MAJEURE */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART P – FORCE MAJEURE
            </h2>
            <p>
              SettleMate is not liable for delays or failures in performing its obligations under this Agreement caused by events beyond its reasonable control, including natural disasters, pandemics, cyberattacks, telecommunications failures, industrial disputes, government actions, utility outages or other unforeseen events (Force Majeure Events).
            </p>
            <div className="space-y-1">
              <p><strong className="text-slate-900">Notice and Mitigation:</strong> SettleMate will:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>(a) notify the Client of a Force Majeure Event as soon as reasonably practicable;</li>
                <li>(b) take reasonable steps to mitigate the impact of the Force Majeure Event on the Services;</li>
                <li>(c) resume performance as soon as the Force Majeure Event ceases.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-600">
              If a Force Majeure Event continues for more than thirty (30) consecutive days, either party may terminate this Agreement by written notice.
            </p>
          </section>

          {/* PART Q – GOVERNING LAW */}
          <section className="pt-6 space-y-2">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART Q – GOVERNING LAW
            </h2>
            <p>This Agreement is governed by the laws of New Zealand.</p>
            <p>The parties submit to the non-exclusive jurisdiction of the New Zealand courts.</p>
          </section>

          {/* PART R – ENTIRE AGREEMENT */}
          <section className="pt-6 space-y-3">
            <h2 className="text-base font-bold text-[#de5d26] uppercase tracking-wide">
              PART R – ENTIRE AGREEMENT
            </h2>
            <p>
              This Agreement, together with any accepted quotation, schedules, policies and documents expressly incorporated by reference, constitutes the entire agreement between the parties and supersedes all prior discussions, negotiations and understandings relating to the Services.
            </p>
            <p>
              <strong className="text-slate-900">Variations:</strong> Any variation to this Agreement must be in writing and signed by both parties. No oral agreement, representation, or promise shall vary or amend this Agreement.
            </p>
          </section>

          {/* CLIENT ACCEPTANCE */}
          <section className="pt-6 space-y-6" id="client-acceptance-section">
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl">
              <h2 className="text-lg font-bold tracking-tight">CLIENT ACCEPTANCE</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                By creating a SettleMate account, accepting a quotation, clicking &quot;I Agree&quot;, electronically signing this Agreement or otherwise using the Services, the Client confirms that they:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-200 mt-2">
                <li>have read and understood this Agreement;</li>
                <li>have had the opportunity to obtain independent legal advice;</li>
                <li>agree to be legally bound by its terms;</li>
                <li>acknowledge the limitations of SettleMate&apos;s role as an independent coordination and referral service.</li>
              </ul>
            </div>

            {/* Checkbox Acknowledgment Block */}
            <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={businessPurposeChecked}
                  onChange={(e) => setBusinessPurposeChecked(e.target.checked)}
                  className="mt-0.5 rounded text-[#de5d26] focus:ring-[#de5d26]"
                />
                <span className="text-slate-700">
                  <strong className="text-slate-900 block mb-0.5">Business Purpose Acknowledgment (if applicable):</strong>
                  I acknowledge that I am acquiring the Services wholly or principally for business purposes and agree that the Consumer Guarantees Act 1993 shall not apply to the extent permitted by law.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer pt-2 border-t border-slate-200">
                <input
                  type="checkbox"
                  checked={referralFeeChecked}
                  onChange={(e) => setReferralFeeChecked(e.target.checked)}
                  className="mt-0.5 rounded text-[#de5d26] focus:ring-[#de5d26]"
                />
                <span className="text-slate-700">
                  <strong className="text-slate-900 block mb-0.5">Referral Fee Acknowledgment:</strong>
                  I acknowledge that SettleMate may receive referral fees, commissions or other benefits from Partners introduced to me.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer pt-2 border-t border-slate-200">
                <input
                  type="checkbox"
                  checked={electronicCommChecked}
                  onChange={(e) => setElectronicCommChecked(e.target.checked)}
                  className="mt-0.5 rounded text-[#de5d26] focus:ring-[#de5d26]"
                />
                <span className="text-slate-700">
                  <strong className="text-slate-900 block mb-0.5">Electronic Communications Consent:</strong>
                  I consent to receive commercial electronic messages from SettleMate and acknowledge that I may unsubscribe at any time.
                </span>
              </label>
            </div>

            {/* Signatures & Execution Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Client Details Box */}
              <div className="p-4 sm:p-5 border border-slate-300 rounded-xl space-y-3 bg-white">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                  Client Details
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Client Name:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      ___________________________
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      ___________________________
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      ___________________________
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Signature (or Electronic Acceptance):</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      ___________________________
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      ___________________________
                    </div>
                  </div>
                </div>
              </div>

              {/* SettleMate Limited Box */}
              <div className="p-4 sm:p-5 border border-slate-300 rounded-xl space-y-3 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>For SettleMate Limited</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-mono">
                    NZ Registered
                  </span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Authorized Representative:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      Managing Director / Legal Officer
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Position:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      Executive Coordinator
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-[#de5d26]">
                      info@settlemate.co.nz
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      +64 022 0709 159
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Signature:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      SettleMate Limited (Seal)
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date:</span>
                    <div className="border-b border-dotted border-slate-400 py-1 font-mono text-slate-800">
                      September 2026
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>

        </div>

        {/* Footer Navigation within Document */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 print:hidden">
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
              onClick={() => onNavigate && onNavigate('disclaimer')}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              Disclaimer
            </button>
            <button
              onClick={onBack}
              className="text-[#de5d26] font-semibold hover:underline cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
