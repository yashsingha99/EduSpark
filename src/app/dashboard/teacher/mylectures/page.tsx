import { HomeActions } from "@/components/home-actions";
import { Container, Flex, Kbd, Link, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import CustomSiderTrigger from "../../_components/CustomSiderTrigger";

export default function Page() {
  return (
    <>
    <CustomSiderTrigger name={"Lectures"} />
    <main className="flex min-h-screen flex-col items-center gap-12 p-10 sm:p-24">
      
      <Container size="1">
        <Flex direction="column" align="center" gap="5">
          <Image
            src="/wordmark.svg"
            alt="LiveKit"
            width="240"
            height="120"
            className="invert dark:invert-0 mt-8 mb-2"
          />
           
          <HomeActions />
          <Separator orientation="horizontal" size="4" className="my-2" />
         
        </Flex>
      </Container>
    </main>
    </>
  );
}