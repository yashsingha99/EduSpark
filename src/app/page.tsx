"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import VanillaTilt from 'vanilla-tilt';
import './landing.css';
import Image from "next/image"
import animated from "../assets/animated.png"
// Import your images here - using placeholders for this example
// Example: import logo from './assets/logo.svg';

const Page = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const animatedGroupRef = useRef<HTMLDivElement>(null);
  const integrationImageRef = useRef<HTMLDivElement>(null);
  const integrationAnimatedRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const actionSectionRef = useRef<HTMLDivElement>(null);
  const integrationSectionRef = useRef<HTMLDivElement>(null);
  const snippetSectionRef = useRef<HTMLDivElement>(null);
  const appSliderRef = useRef<HTMLDivElement>(null);

  // Initialize tilt effect for cards
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Navbar opacity
    if (navbarRef.current) {
      navbarRef.current.style.opacity = '1';
    }

    // Initialize Tilt effect
    const elements = document.querySelectorAll<HTMLElement>('[data-tilt]');
    if (elements.length > 0) {
      VanillaTilt.init(Array.from(elements), {
        speed: 5000,
        max: 15,
        reverse: true,
      });
    }

    // Card hover effect
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach(card => {
        if (!card) return;
        
        const cardLight = card.querySelector('.light') as HTMLElement;
        
        const handleMouseMove = (e: MouseEvent) => {
          if (!cardLight) return;
          
          cardLight.style.opacity = '0.1';
          cardLight.style.left = e.clientX - card.getBoundingClientRect().left - cardLight.offsetWidth / 2 + 'px';
          cardLight.style.top = e.clientY - card.getBoundingClientRect().top - cardLight.offsetHeight / 2 + 'px';
        };
        
        const handleMouseOut = () => {
          if (!cardLight) return;
          cardLight.style.opacity = '0';
        };
        
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseout', handleMouseOut);
        
        return () => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseout', handleMouseOut);
        };
      });
    }

    // GSAP Animations
    if (animatedGroupRef.current) {
      gsap.to(animatedGroupRef.current, {
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          scrub: 0.5,
          end: '100% 50%',
          pin: true,
        },
        top: "-70%",
        duration: 10,
      });
    }

    if (integrationImageRef.current) {
      gsap.to(integrationImageRef.current, {
        scrollTrigger: {
          trigger: integrationSectionRef.current,
          start: "top 120%",
          end: "bottom 100%",
          scrub: 1,
        },
        top: "28%",
        duration: 3
      });
    }

    if (integrationAnimatedRef.current) {
      gsap.to(integrationAnimatedRef.current, {
        scrollTrigger: {
          trigger: appSliderRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 2
        },
        width: "100%",
        duration: 10
      });
    }

    // Scroll event for navbar active state
    const handleScroll = () => {
      const navLi = document.querySelectorAll('.navbar ul li');
      
      if (!actionSectionRef.current || !integrationSectionRef.current || !snippetSectionRef.current) return;
      
      const actionSectionTop = actionSectionRef.current.getBoundingClientRect().top;
      const actionSectionBottom = actionSectionRef.current.getBoundingClientRect().bottom;
      const integrationSectionTop = integrationSectionRef.current.getBoundingClientRect().top;
      const integrationSectionBottom = integrationSectionRef.current.getBoundingClientRect().bottom;
      const snippetSectionTop = snippetSectionRef.current.getBoundingClientRect().top;
      const snippetSectionBottom = snippetSectionRef.current.getBoundingClientRect().bottom;

      if (actionSectionTop <= 0 && actionSectionBottom >= 0) {
        navLi.forEach(li => {
          li.classList.remove('active');
        });
        navLi[0].classList.add('active');
      } else if (integrationSectionTop <= 0 && integrationSectionBottom >= 0) {
        navLi.forEach(li => {
          li.classList.remove('active');
        });
        navLi[1].classList.add('active');
      } else if (snippetSectionTop <= 0 && snippetSectionBottom >= 0) {
        navLi.forEach(li => {
          li.classList.remove('active');
        });
        navLi[2].classList.add('active');
      } else {
        navLi.forEach(li => {
          li.classList.remove('active');
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Integration section mouse move effect
    if (integrationSectionRef.current) {
      const integrationSection = integrationSectionRef.current;
      const handleIntegrationMouseMove = (e: MouseEvent) => {
        if (!appSliderRef.current) return;
        
        const mouseX = e.pageX - integrationSection.offsetLeft;
        const boxCenterX = integrationSection.offsetWidth / 2;

        gsap.to(appSliderRef.current, {
          x: -(mouseX - boxCenterX) / 20,
          duration: 3,
        });
      };

      integrationSection.addEventListener('mousemove', handleIntegrationMouseMove);
      
      return () => {
        integrationSection.removeEventListener('mousemove', handleIntegrationMouseMove);
      };
    }

    // Hero section mouse move effect
    if (heroSectionRef.current) {
      const handleHeroMouseMove = (e: MouseEvent) => {
        const heroSection = heroSectionRef.current;
        if (!heroSection) return;
        
        const mouseX = e.pageX - heroSection.offsetLeft;
        const boxCenterX = heroSection.offsetWidth / 2;

        const imgContainer = heroSection.querySelector('.animatedGroup .imgContainer');
        const heroText = heroSection.querySelector('.heroText');
        
        if (imgContainer) {
          gsap.to(imgContainer, {
            x: (mouseX - boxCenterX) / 50,
            duration: 3,
          });
        }
        
        if (heroText) {
          gsap.to(heroText, {
            x: -(mouseX - boxCenterX) / 50,
            duration: 3,
          });
        }
      };

      heroSectionRef.current.addEventListener('mousemove', handleHeroMouseMove);
      
      return () => {
        if (heroSectionRef.current) {
          heroSectionRef.current.removeEventListener('mousemove', handleHeroMouseMove);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Handle card refs
  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="alice-landing">
      <div className="navbar" ref={navbarRef}>
        <ul>
          <li>
            <a href="#action">Actions</a>
            <div className="glowNavbar"></div>
          </li>
          <li>
            <a href="#integration">Integrations</a>
            <div className="glowNavbar"></div>
          </li>
          <li>
            <a href="#snippets">Snippets</a>
            <div className="glowNavbar"></div>
          </li>
          <li>
            <a href="#footer">Pricing</a>
            <div className="glowNavbar"></div>
          </li>
          <button className="waitlist">Get on Waitlist</button>
        </ul>
      </div>

      <div className="heroSection" ref={heroSectionRef}>
        <div className="heroText">
          <h1>Alice</h1>
        </div>
        <div className="brandList">
          <Image src="/Images/product1.svg" alt="Product 1" width={120} height={50} />
          <Image src="/Images/product2.svg" alt="Product 2" width={120} height={50} />
          <Image src="/Images/product3.svg" alt="Product 3" width={120} height={50} />
          <Image src="/Images/product4.svg" alt="Product 4" width={120} height={50} />
          <Image src="/Images/product5.svg" alt="Product 5" width={120} height={50} />
        </div>
        <div className="animatedGroup" ref={animatedGroupRef}>
          <div className="imgContainer">
            <Image src={animated} alt="Animated" width={400} height={300} />
          </div>
          <div className="contentContainer">
            <p>
              Introducing Alice - worlds first AI assistant for macOS that works with your apps. Think of it as
              ChatGPT desktop client that can also perform actions. Imagine you can ask it to <br />
              <span>create a playlist on Spotify</span>, <span>check your todo</span> or <span>reschedule the
                meeting.</span>
            </p>
            <button className="waitlist">Get on Waitlist</button>
          </div>
        </div>
      </div>

      <div id="action" className="actionSection" ref={actionSectionRef}>
        <div className="actionTitle">
          <h1>Ask for actions not answers</h1>
        </div>
        <div className="actionCards">
          <div className="card cardLg" ref={addToCardsRef} data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
            <div className="light"></div>
            <div className="cardImg">
              <Image src="/Images/card1.png" alt="Schedule meeting" width={600} height={300} />
              <div className="imgGradient"></div>
            </div>
            <div className="cardContent">
              <h2>"Hey, Alice, schedule meeting with Anne"</h2>
              <p>Alice can work with your calendar to manage meetings and invitations.</p>
            </div>
          </div>

          <div className="card cardSm" ref={addToCardsRef} data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
            <div className="light"></div>
            <div className="cardImg">
              <Image src="/Images/card2.png" alt="Check sales" width={300} height={200} />
              <div className="imgGradient"></div>
            </div>
            <div className="cardContent">
              <h2>"check sales"</h2>
              <p>Alice can connect to Stripe and give you some reports on your SaaS sales.</p>
            </div>
          </div>

          <div className="card cardSm" ref={addToCardsRef} data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
            <div className="light"></div>
            <div className="cardImg">
              <Image src="/Images/card3.png" alt="Check sprint" width={300} height={200} />
              <div className="imgGradient"></div>
            </div>
            <div className="cardContent">
              <h2>"check sprint"</h2>
              <p>Alice can connect to your favourite apps to bring you current data.</p>
            </div>
          </div>

          <div className="card cardLg" ref={addToCardsRef} data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
            <div className="light"></div>
            <div className="cardImg">
              <Image src="/Images/card4.png" alt="Check tasks" width={600} height={300} />
            </div>
            <div className="cardContent">
              <h2>"check my tasks for today"</h2>
              <p>Alice can aggregate many sources with your tasks such as todo apps, Gmail and more and display
                all tasks in one place.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="integration" className="integrationSection" ref={integrationSectionRef}>
        <div className="integrationHeading">
          <h1>Works with your apps</h1>
          <p>
            Alice can be connected to thousands of apps you already use. Just use text or voice command and it's done.
          </p>
        </div>
        <div className="appSlider" ref={appSliderRef}>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/skype.svg" alt="Skype" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/meet.svg" alt="Meet" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/dropbox.svg" alt="Dropbox" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/logo.svg" alt="Logo" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/mail.svg" alt="Mail" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/spotify.svg" alt="Spotify" width={120} height={120} />
          </div>
          <div className="slides" data-tilt data-tilt-speed="10000" data-tilt-max="35" data-tilt-reverse="true">
            <Image src="/Images/logo2.svg" alt="Logo 2" width={120} height={120} />
          </div>
        </div>
        <div className="imgContainer" ref={integrationImageRef}>
          <Image src="/Images/animatedCard.png" alt="Animated Card" width={500} height={500} />
        </div>
        <div className="integrationAnimated" ref={integrationAnimatedRef}>
          <div className="animatedLine">
            <div className="animatedLight"></div>
          </div>
        </div>
        <div className="integrationFooter">
          <h3>Use automation templates or let us handle it</h3>
          <p>
            If you know how to create make.com automations, you can get our blueprints and customise everything to
            your needs. If not - no worries. We can help you set everything up!
          </p>
        </div>
      </div>

      <div id="snippets" className="snippetsSection" ref={snippetSectionRef}>
        <div className="scrollContainer">
          <div className="snippetsHeading">
            <h1>Snippets at your fingertips</h1>
            <p>
              Alice has <span>built-in</span> prompts that you can use in app or with a keyboard shortcut. You can
              also define your own prompts and add them as Snippets. This is much more convenient than just chatting.
            </p>
          </div>
          <div className="snippetsGallery">
            {[
              {
                title: "100+",
                subtitle: "ready-made prompts",
                content: "From fixing grammar and typos, translations and drafting emails to brainstorming ideas with AI and using mental models in the decision making process."
              },
              {
                title: "TEXT",
                subtitle: "prompts",
                content: "Quickly fix grammar and spelling, translate text to any language, extend or shorten it or even rewrite it to any style and length you need. We have dozen text prompts ready to use as snippets."
              },
              {
                title: "Productivity",
                subtitle: "prompts",
                content: "Create invitations, kindly accept or refuse proposals, brainstorm ideas or perform some critical thinking on your current ideas. Use code prompts for code debugging, writing JavaScript and SQL queries."
              },
              {
                title: "Marketing",
                subtitle: "prompts",
                content: "Create a short marketing copy for social media, or a long-form for a blog post. Brainstorm different channels and get your copy polished for best engagement. Everything within Alice app!"
              },
              {
                title: "Business",
                subtitle: "prompts",
                content: "Whether you need to brainstorm a business idea, get some insights on data or come up with a great offer formatted as an e-mail, you can use our prompts to get the results in not time, without leaving app you're using."
              },
              {
                title: "File",
                subtitle: "prompts",
                content: "You can map each snippet to a custom keyboard shortcut and use the app in the background, while it's performing actions on the text that you copied to clipboard. This way you don't have to leave the app you're working in!"
              }
            ].map((item, index) => (
              <div className="slides" key={index}>
                <div className="title">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
                <div className="content">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="snippetsFooter">
          <h1>Start using Alice now</h1>
          <p>
            You can try the full version of Alice, including custom onboarding and Action Pack. Or select Lite if you
            just need desktop ChatGPT capabilities and shortcuts.
          </p>
        </div>
      </div>

      <div id="footer" className="footerSection">
        <div className="footerHeading">
          <h1>Work hand in hand <br /> with AI assistant</h1>
          <p>Start your free trial now and see how easy it is to track, manage, and optimize your time.</p>
        </div>
        <div className="footerGrid">
          <div className="slides vertical">
            <div className="imgContainer">
              <Image src="/Images/footer1.svg" alt="Integrations" width={300} height={200} />
            </div>
            <div className="content">
              <h3>Integrations</h3>
              <p>We can make a custom integration for you</p>
            </div>
          </div>
          <div className="slides horizontal">
            <div className="imgContainer">
              <Image src="/Images/footer2.svg" alt="Works with APIs" width={300} height={200} />
            </div>
            <div className="content">
              <h3>Works with APIs</h3>
              <p>Whatever API you have, Alice can connect to it and perform action</p>
            </div>
          </div>
          <div className="slides horizontal">
            <div className="imgContainer">
              <Image src="/Images/footer3.svg" alt="Badge" width={300} height={200} />
              <div className="tiltedBadge" data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
                <Image src="/Images/footer4.webp" alt="Badge" width={175} height={175} />
              </div>
            </div>
          </div>
          <div className="slides vertical">
            <div className="imgContainer">
              <Image src="/Images/footer5.svg" alt="Reports 1" width={300} height={200} />
              <Image src="/Images/footer6.svg" alt="Reports 2" width={300} height={200} />
            </div>
            <div className="content">
              <h3>Reports</h3>
              <p>Alice can help you generate custom reports</p>
            </div>
          </div>
        </div>
        <div className="footerFlex">
          {[
            {
              title: "Marketplace",
              content: "Soon we'll implement Snippet marketplace for Alice!"
            },
            {
              title: "Own avatar",
              content: "Give Alice a custom name and avatar and make it more personal!"
            },
            {
              title: "Speed up",
              content: "Alice will help you work faster than ever before!"
            }
          ].map((item, index) => (
            <div className="slides" key={index}>
              <div className="imgContainer">
                <Image src="/Images/footer7.svg" alt={item.title} width={300} height={200} />
              </div>
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="credits" data-tilt data-tilt-speed="5000" data-tilt-reverse="true">
          <h5>Developed By Nitish Singh</h5>
        </div>
      </div>
    </div>
  );
};

export default Page;