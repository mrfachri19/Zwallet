import { Footer, Sidebar, Navbar, FooterMobile } from "components/module";
import Head from "next/head";

export default function MainLayout(props) {
  return (
    <>
      <Head>
        <title> {props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        firstName={props.firstName}
        lastName={props.lastName}
        noTelp={props.noTelp}
        image={props.image}
      />
      <div style={{ background: "rgba(99, 121, 244, 0.05)" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3">
              <div className="row">
                <div className="d-none d-md-block col-0 col-md-12">
                  <Sidebar />
                </div>
                <div className="d-block d-md-none col-12 col-md-0"></div>
              </div>
            </div>

            <div className="col-12 col-md-9">{props.children}</div>
          </div>
        </div>
      </div>

      <div className="row m-0 color-primary">
        <div className="d-none d-md-block col-md-12">
          <Footer />
        </div>
        <div className="d-block d-md-none col-12 mb-5">
          <FooterMobile />
        </div>
      </div>
    </>
  );
}
