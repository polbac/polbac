import { MorphingText } from "@/components/ui/morphing-text"

export default function Music() {
    return (
        <main>

            <div className="description">
                hi! :) you can call me pol, i'm <MorphingText className="morph" texts={["music producer", "drummer", "composer", "synthetizer", "mixer"]} />
            </div>

            <div className="flex gap-5 flex-col md:flex-row items-center">

                <iframe className="album" src="https://bandcamp.com/EmbeddedPlayer/album=3451589319/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless />
                <iframe className="album" src="https://bandcamp.com/EmbeddedPlayer/album=2255985704/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless />

            </div>


            <div className="description font-sx mt-5" >
                <p>
                    i am part of <a className="button" href="https://stralc.xyz/" target="_blank">STRLC records</a>
                </p>
                <p className="mt-5">
                    you can find me on<br /><a className="button" href="https://bandcamp.com/polbac" target="_blank">bandcamp</a>, <a className="button" href="https://www.ninaprotocol.com/profiles/polbac" target="_blank">nina protocol</a>
                </p>
            </div>



        </main >
    )
}