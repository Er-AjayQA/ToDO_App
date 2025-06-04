import { Footer, FooterCopyright } from "flowbite-react";

export const AdminFooter = () => {
  return (
    <>
      <Footer container>
        <FooterCopyright
          href="#"
          by="Flowbite™"
          year={2022}
          className="mx-auto"
        />
      </Footer>
    </>
  );
};
