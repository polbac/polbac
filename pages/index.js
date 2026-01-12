


import { MorphingText } from "@/components/ui/morphing-text"

export default function Home() {




  return (
    <main>

      <div className="description">
        hi! :) you can call me pol, i'm <MorphingText className="morph" texts={["software engineer", "digital designer"]} />

      </div>

      <div className="text-center flex justify-center items-center mb-20">
        <img src="/pol.jpg" alt="polbac" width="150" />
      </div>



      <h2>Working now on</h2>

      <div className="card">
        <div className="chip">FULL TIME</div>
        <h3><img src="/logos/nx.svg" alt="bond club logo" width="150" /></h3>
        <p>Working as a sr software engineer on payment fluxes (aka collections)</p>
        <div className="card-footer">
          <a className="button" target="_blank" href="https://www.naranjax.com/">Go →</a></div>
      </div>

      <p className="text-center mb-10" style={{ marginTop: "-2rem" }}><a href="https://www.linkedin.com/in/polbac/" target="_blank">More history  →</a></p>


      <h2>Some side projects </h2>

      <div className="card">
        <div className="chip">CO-CREATING 1/2</div>
        <h3><img src="/logos/docu.svg" alt="docu logo" width="120" /></h3>
        <p className="mt-2">We are building a platform for Latin American galleries to manage their artists, catalogs, exhibitions, sales, and shipments. We leverage AI tools to streamline workflows and accelerate development processes.</p>
        <div className="card-footer">
          <a className="button" target="_blank" href="https://www.docu.art/">Go →</a></div>
      </div>



      <div className="card">
        <div className="chip">CO-CREATING 1/3</div>
        <h3><img src="/logos/bond.svg" alt="bond club logo" width="200" /></h3>
        <p className="mt-2">We are building a film platform for indie producers and enthusiasts, creating a circular monetization ecosystem.</p>
        <div className="card-footer">
          <a className="button" href="#">Cooming soon</a></div>
      </div>

      <h2>Organizing meetups</h2>

      <div className="card">
        <h3>Energía HTML</h3>
        <p>We are hosting HTML Energy, an annual event celebrating HTML Day through a free-writing gathering. We have already held two editions with very positive reception.</p>
        <div className="card-footer">
          <a className="button" target="_blank" href="https://energiahtml.com/">Go →</a></div>
      </div>






    </main>



  )
}
