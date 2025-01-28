import {AuroraBackground } from "./hero-background";
import { FadeContainer, FadeDiv, FadeSpan } from "./Fade"
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import FloatingImages from "./floating-images"

export default function Hero(){
    return (
        <>
            <section aria-label="hero">
                <AuroraBackground>
                    <FadeContainer className="relative flex flex-col items-center justify-center gap-10">
                        <h1 className="mt-8 text-center text-5xl lg:text-7xl font-semibold tracking-tighter text-gray-900  sm:leading-[5.5rem]">
                            <FadeSpan>Guarde cada memória, </FadeSpan>
                            <br />
                            <FadeSpan>Compartilhe cada emoção.</FadeSpan>
                        </h1>
                        <FloatingImages />
                        <FadeDiv>
                            <Link href="/pt/dashboard" passHref>
                                <Button size="lg" className="rounded-xl" effect="expandIcon" icon={ArrowRightIcon} iconPlacement="right" >
                                    Comece agora
                                </Button>
                            </Link>
                        </FadeDiv>
                    </FadeContainer>
                </AuroraBackground>
            </section>
        </>
    )
}