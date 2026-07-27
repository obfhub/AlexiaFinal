import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 md:px-[8vw]"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-light text-primary mb-12">
          Terms & Conditions
        </h1>

        <div className="prose prose-lg max-w-none space-y-10 font-body text-primary/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              A legal disclaimer
            </h2>
            <p>
              The explanations and information provided on this page are only general and high-level explanations and information on how to write your own document of Terms & Conditions. You should not rely on this article as legal advice or as recommendations regarding what you should actually do, because we cannot know in advance what are the specific terms you wish to establish between your business and your customers and visitors. We recommend that you seek legal advice to help you understand and to assist you in the creation of your own Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Terms & Conditions - the basics
            </h2>
            <p>
              Having said that, Terms and Conditions ("T&C") are a set of legally binding terms defined by you, as the owner of this website. The T&C set forth the legal boundaries governing the activities of the website visitors, or your customers, while they visit or engage with this website. The T&C are meant to establish the legal relationship between the site visitors and you as the website owner.
            </p>
            <p className="mt-4">
              T&C should be defined according to the specific needs and nature of each website. For example, a website offering products to customers in e-commerce transactions requires T&C that are different from the T&C of a website only providing information (like a blog, a landing page, and so on).
            </p>
            <p className="mt-4">
              T&C provide you as the website owner the ability to protect yourself from potential legal exposure, but this may differ from jurisdiction to jurisdiction, so make sure to receive local legal advice if you are trying to protect yourself from legal exposure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              What to include in the T&C document
            </h2>
            <p>
              Generally speaking, T&C often address these types of issues: Who is allowed to use the website; the possible payment methods; a declaration that the website owner may change his or her offering in the future; the types of warranties the website owner gives his or her customers; a reference to issues of intellectual property or copyrights, where relevant; the website owner's right to suspend or cancel a member's account; and much, much more.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}