/**
 * FlowPass — Landing Page
 *
 * The public-facing homepage that explains the product, showcases
 * an interactive hero pass card, and provides CTAs for both
 * organisers and attendees.
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Ticket, Radio, Users, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { HERO_CYCLE_INTERVAL_MS } from '../lib/constants';

import HeroSection from '../components/landing/HeroSection';
import ProblemStats from '../components/landing/ProblemStats';
import RolesSwitcher from '../components/landing/RolesSwitcher';
import HowItWorks from '../components/landing/HowItWorks';
import GlassCard from '../components/landing/GlassCard';
import SmartLogicBento from '../components/landing/SmartLogicBento';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <ProblemStats />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* THREE ROLES */}
      <section id="roles" className="py-12 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-20">
            <div className="text-wait font-mono text-sm tracking-widest uppercase mb-4">Three Roles. One System.</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Built for everyone at the venue.</h2>
          </div>

          <RolesSwitcher />
        </div>
      </section>

      {/* SMART LOGIC HIGHLIGHT */}
      <SmartLogicBento />
    </div>
  );
}
