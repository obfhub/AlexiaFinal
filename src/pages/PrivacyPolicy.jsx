import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 md:px-[8vw]"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-light text-primary mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none space-y-10 font-body text-primary/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              A legal disclaimer
            </h2>
            <p>
              The explanations and information provided on this page are only general and high-level explanations and information on how to write your own document of a Privacy Policy. You should not rely on this article as legal advice or as recommendations regarding what you should actually do, because we cannot know in advance what are the specific privacy policies you wish to establish between your business and your customers and visitors. We recommend that you seek legal advice to help you understand and to assist you in the creation of your own Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Privacy Policy - the basics
            </h2>
            <p>
              Having said that, a privacy policy is a statement that discloses some or all of the ways a website collects, uses, discloses, processes, and manages the data of its visitors and customers. It usually also includes a statement regarding the website's commitment to protecting its visitors' or customers' privacy, and an explanation about the different mechanisms the website is implementing in order to protect privacy.
            </p>
            <p className="mt-4">
              Different jurisdictions have different legal obligations of what must be included in a Privacy Policy. You are responsible to make sure you are following the relevant legislation to your activities and location.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              What to include in the Privacy Policy
            </h2>
            <p>
              Generally speaking, a Privacy Policy often addresses these types of issues: the types of information the website is collecting and the manner in which it collects the data; an explanation about why is the website collecting these types of information; what are the website's practices on sharing the information with third parties; ways in which your visitors and customers can exercise their rights according to the relevant privacy legislation; the specific practices regarding minors' data collection; and much, much more.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}