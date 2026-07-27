import { motion } from "framer-motion";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 md:px-[8vw]"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-light text-primary mb-12">
          Accessibility Statement
        </h1>

        <div className="prose prose-lg max-w-none space-y-10 font-body text-primary/80 leading-relaxed">
          <p>
            The purpose of the following template is to assist you in writing your accessibility statement. Please note that you are responsible for ensuring that your site's statement meets the requirements of the local law in your area or region.
          </p>

          <p className="italic text-sm">
            *Note: This page currently has several sections. Once you complete editing the Accessibility Statement below, you need to delete this section.
          </p>

          <p>
            To learn more about this, check out our article{" "}
            "Accessibility: Adding an Accessibility Statement to Your Site".
          </p>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Accessibility Statement
            </h2>
            <p>
              This statement was last updated on [enter relevant date].
            </p>
            <p>
              We at [enter organization / business name] are working to make our site [enter site name and address] accessible to people with disabilities.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              What Web Accessibility Is
            </h2>
            <p>
              An accessible site allows visitors with disabilities to browse the site with the same or a similar level of ease and enjoyment as other visitors. This can be achieved with the capabilities of the system on which the site is operating, and through assistive technologies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Accessibility Adjustments on This Site
            </h2>
            <p>
              We have adapted this site in accordance with WCAG [2.0 / 2.1 / 2.2 - select relevant option] guidelines, and have made the site accessible to the level of [A / AA / AAA - select relevant option]. This site's contents have been adapted to work with assistive technologies, such as screen readers and keyboard use. As part of this effort, we have also [remove irrelevant information]:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Used the Accessibility Wizard to find and fix potential accessibility issues</li>
              <li>Set the language of the site</li>
              <li>Set the content order of the site's pages</li>
              <li>Defined clear heading structures on all of the site's pages</li>
              <li>Added alternative text to images</li>
              <li>Implemented color combinations that meet the required color contrast</li>
              <li>Reduced the use of motion on the site</li>
              <li>Ensured all videos, audio, and files on the site are accessible</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Declaration of Partial Compliance With the Standard Due to Third-Party Content
            </h2>
            <p className="italic">[only add if relevant]</p>
            <p>
              The accessibility of certain pages on the site depend on contents that do not belong to the organization, and instead belong to [enter relevant third-party name]. The following pages are affected by this: [list the URLs of the pages]. We therefore declare partial compliance with the standard for these pages.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Accessibility Arrangements in the Organization
            </h2>
            <p className="italic">[only add if relevant]</p>
            <p>
              [Enter a description of the accessibility arrangements in the physical offices / branches of your site's organization or business. The description can include all current accessibility arrangements — starting from the beginning of the service (e.g., the parking lot and / or public transportation stations) to the end (such as the service desk, restaurant table, classroom etc.). It is also required to specify any additional accessibility arrangements, such as disabled services and their location, and accessibility accessories (e.g. in audio inductions and elevators) available for use]
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-light text-primary mb-4">
              Requests, Issues, and Suggestions
            </h2>
            <p>
              If you find an accessibility issue on the site, or if you require further assistance, you are welcome to contact us through the organization's accessibility coordinator:
            </p>
            <ul className="list-none space-y-1 mt-2">
              <li>[Name of the accessibility coordinator]</li>
              <li>[Telephone number of the accessibility coordinator]</li>
              <li>[Email address of the accessibility coordinator]</li>
              <li>[Enter any additional contact details if relevant / available]</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}