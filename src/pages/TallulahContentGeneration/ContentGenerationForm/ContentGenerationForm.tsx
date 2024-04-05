import {
  ContentGenerationTemplatesService,
  ContentGenerationsService,
  GetContentGenerationTemplate_Out,
  GetMultipleContentGenerationTemplate_Out
} from 'src/tallulah-ts-client';
import styles from './ContentGenerationForm.module.css';
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useNotification from 'src/hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

export interface IContentGenerationForm {}

const ALL_TEMPLATES = [
  {
    name: 'Support And Education Letters',
    description: 'This is a template for the Support And Education Letters generation',
    parameters: [
      {
        name: 'name',
        label: 'Patient Name',
        description: 'Patient Name',
        place_holder: 'Patient Name',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'age',
        label: 'Age',
        description: 'Age',
        place_holder: 'Age',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'gender',
        label: 'Gender',
        description: 'Gender',
        place_holder: 'Gender',
        type: 'SELECT',
        required: true,
        options: ['Male', 'Female']
      },
      {
        name: 'mother',
        label: "Mother's Name",
        description: "Mother's Name",
        place_holder: 'Mother',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'father',
        label: "Father's Name",
        description: "Father's Name",
        place_holder: 'Father',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'diagnosis',
        label: 'Diagnosis',
        description: 'Diagnosis',
        place_holder: 'Diagnosis',
        type: 'TEXT',
        required: true,
        options: [
          'Mitochondrial Disease, potentially Leigh Syndrome',
          'PolG',
          'Complex 1, Complex 3 Mitochondrial Disease',
          'oxidative phosphorylation deficiency, type 11',
          'CPEO/KSS',
          'MERFF',
          'PDCD',
          'Leigh Syndrome',
          'TK2d',
          'Mitochondrial Disease',
          'MCAD',
          'Mitochondrial disease complex 1 and 3 deficiency',
          'LHON'
        ]
      },
      {
        name: 'priority_1',
        label: 'Priority 1',
        description: 'Priority 1',
        place_holder: 'Priority 1',
        type: 'SELECT',
        required: true,
        options: [
          'Grief Support',
          'LHON Research',
          'New Treatments & Cures',
          'Research',
          'Funding for Research',
          'PolG Research',
          'Access to Specialists',
          'MERFF Research',
          'Leigh Syndrome Research',
          'Early Diagnosis'
        ]
      },
      {
        name: 'priority_2',
        label: 'Priority 2',
        description: 'Priority 2',
        place_holder: 'Priority 2',
        type: 'SELECT',
        required: true,
        options: [
          'Access to Specialists',
          'Advocacy',
          'Clinical Trials',
          'Connecting with other TK2d families',
          'Diagnosis',
          'Helping other patients',
          'New Treatments & Cures',
          'Research',
          'Research, Treatments'
        ]
      },
      {
        name: 'other',
        label: 'Other',
        description: 'Other',
        place_holder: 'Other',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'support_meetings',
        label: 'Attends Support Meetings',
        description: 'Attends Support Meetings',
        place_holder: 'Attends Support Meetings',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'symposium',
        label: 'Attended Mitochondrial Medicine Symposium',
        description: 'Attended Mitochondrial Medicine Symposium',
        place_holder: 'Attended Mitochondrial Medicine Symposium',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'pillar_1',
        label: 'UMDF Pillar Focus #1',
        description: 'UMDF Pillar Focus #1',
        place_holder: 'UMDF Pillar Focus #1',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'pillar_2',
        label: 'UMDF Pillar Focus #2',
        description: 'UMDF Pillar Focus #2',
        place_holder: 'UMDF Pillar Focus #2',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'call_to_action',
        label: 'Call To Action/Reason for Letter',
        description: 'Call To Action/Reason for Letter',
        place_holder: 'Call To Action/Reason for Letter',
        type: 'SELECT',
        required: true,
        options: ['Donate today']
      },
      {
        name: 'state',
        label: 'State',
        description: 'State',
        place_holder: 'State',
        type: 'TEXT',
        required: true,
        options: []
      }
    ],
    context: [
      {
        role: 'system',
        content:
          "You are an AI assistant that works with the United Mitochondrial Disease Foundation (UMDF). You are skilled at creating outreach fundraising letters. You craft these letters based on patient stories, highlighting the patients' personal journeys and what is important to the patient in order to foster a sense of connection from UMDF's followers. Include the patient's state in the call to action; letters will be sent to those in the same state. You do not embellish upon the information given to you and you do not sensationalize or use cliches. Include a bit of backstory on the disease. Do not include any details about the patient that are not given to you."
      }
    ],
    prompt:
      'Patient Name: {name}, Age: {age}, Gender: {gender}, Mother: {mother}, Father: {father}                     Diagnosis: {diagnosis}, Priority 1:{priority_1}, Priority 2:{priority_2}, Other: {other}, Attends Support Meetings: {support_meetings},                     Attended Mitochondrial Medicine Symposium: {symposium}, UMDF Pillar Focus #1: {pillar_1}, UMDF Pillar Focus #2: {pillar_2},                     Call To Action/Reason for Letter: {call_to_action}, State: {state},                     Info for background on Pillar Focus #1 to include in the letter: At Every Step of Your Mitochondrial Disease Journey UMDF is Here to Help.\n\nWe know you’re seeking answers. UMDF is here to educate in difficult times, provide helpful resources and offer caring support. Connect with our Patient Concierge or contact our Support Line at (888) 900-6486 weekdays from 8:00am to 5:00pm EST.\n\nA Patient Concierge can connect you with a local mito family or a UMDF Support Ambassador from our national network of volunteers.\n\nConnect with our Patient Concierge\n\nMitochondrial Care Network: New Patient Guide\nAn informative toolkit prepared by the medical community to help guide newly diagnosed patients, their families and caregivers.\nDownload Now\nFind a Doctor\nUMDF maintains a list of 200+ doctors treating and researching mitochondrial disease.\nFind a Doc\nHELPFUL RESOURCES\nFrom webcasts to podcasts, UMDF keeps you connected and informed on the latest in mitochondrial disease.\nAsk the Mito Doc\nClinicians answer your questions in this monthly webcast series to help patients and families connect with the mitochondrial disease medical community. \n\nRegister Now\nBench-to-Bedside\nThis ongoing seminar series brings the global scientific community together to discuss mitochondrial disease research.\n\nRequest an Invite\nMito U\nVisit our library of on-demand videos and curated articles to better navigate and understand a mitochondrial disease diagnosis.\n\nLearn More\nThe Powerhouse Podcast\nTune in as UMDF CEO, Brian Harman, and UMDF Science & Alliance Officer, Dr. Phil Yeske, chat with interesting people in the mito community.\n\nLatest Episode\nTravel Tips for Mito Families\nUMDF ambassadors and partners at the University of Minnesota have put together tips for mito patients and their loved ones as they prepare to hit the road (or skies).\n\nMito Travel Guide: reminders on managing care, packing and flying.\nTravel Checklist: a suggested packing list and advice for patients traveling for the first time.\nCourtesy of University of Minnesota, Orphan Drug Research Course – Student Team “Blue Genes” and UMDF Ambassadors.\n\nOTHER RESOURCES\nVirtual Support Services Available\nUMDF Support Group\nMeetings & Events\nUMDF Mito Grief Mentors\nInspire Mito Energy Connection\nAttend Mitochondrial Medicine Conference\nDiscover an entire community of resources and support services during UMDF’s annual Conference. As the world’s preeminent event for mitochondrial disease, the Conference gives patients and families the opportunity to meet some of the top clinical mitochondrial specialists from around the world and attend social events to network with others who share your journey.\n\nLearn More\nSTAY CONNECTED\n\nConnect with a UMDF Support Ambassador\nOur team of 90+ dedicated volunteers understand what you’re experiencing and are here to listen, talk and offer a shoulder to lean on.\n\n“Through the magic of social media, I was connected with UMDF Support Ambassador Stacy. She has been so welcoming and ready to share any and all her knowledge and experiences with me. She connected me with other families, which has been invaluable during the ups and downs of my daughter’s diagnosis process.” Kristen • Hanover, PA\n\nLet us connect you with a UMDF Support Ambassador who shares your diagnosis, lives in your area, or specializes in various topics.\nSocial Security Disability\nTransitioning to Adulthood\nIEPs and School Issues\nMedical Child Abuse\nTotal Parental Nutrition (TPN)\nMedical Cannabis\nDisease Specific Support\nGeneral Support and Grief\nNavigating Insurance\n',
    id: '42506b1e-4405-42d2-87f4-f3d0a9544144',
    user_id: 'e137ed69-6b04-4efa-b0ea-80e8d90b10c3',
    organization: 'United Mitochondrial Disease Foundation',
    creation_time: '2024-02-28T13:12:30.531007',
    state: 'ACTIVE'
  },
  {
    name: 'Research Letters',
    description: 'This is a template for the Research Letters generation',
    parameters: [
      {
        name: 'name',
        label: 'Patient Name',
        description: 'Patient Name',
        place_holder: 'Patient Name',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'age',
        label: 'Age',
        description: 'Age',
        place_holder: 'Age',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'gender',
        label: 'Gender',
        description: 'Gender',
        place_holder: 'Gender',
        type: 'SELECT',
        required: true,
        options: ['Male', 'Female']
      },
      {
        name: 'mother',
        label: "Mother's Name",
        description: "Mother's Name",
        place_holder: 'Mother',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'father',
        label: "Father's Name",
        description: "Father's Name",
        place_holder: 'Father',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'diagnosis',
        label: 'Diagnosis',
        description: 'Diagnosis',
        place_holder: 'Diagnosis',
        type: 'TEXT',
        required: true,
        options: [
          'Mitochondrial Disease, potentially Leigh Syndrome',
          'PolG',
          'Complex 1, Complex 3 Mitochondrial Disease',
          'oxidative phosphorylation deficiency, type 11',
          'CPEO/KSS',
          'MERFF',
          'PDCD',
          'Leigh Syndrome',
          'TK2d',
          'Mitochondrial Disease',
          'MCAD',
          'Mitochondrial disease complex 1 and 3 deficiency',
          'LHON'
        ]
      },
      {
        name: 'priority_1',
        label: 'Priority 1',
        description: 'Priority 1',
        place_holder: 'Priority 1',
        type: 'SELECT',
        required: true,
        options: [
          'Grief Support',
          'LHON Research',
          'New Treatments & Cures',
          'Research',
          'Funding for Research',
          'PolG Research',
          'Access to Specialists',
          'MERFF Research',
          'Leigh Syndrome Research',
          'Early Diagnosis'
        ]
      },
      {
        name: 'priority_2',
        label: 'Priority 2',
        description: 'Priority 2',
        place_holder: 'Priority 2',
        type: 'SELECT',
        required: true,
        options: [
          'Access to Specialists',
          'Advocacy',
          'Clinical Trials',
          'Connecting with other TK2d families',
          'Diagnosis',
          'Helping other patients',
          'New Treatments & Cures',
          'Research',
          'Research, Treatments'
        ]
      },
      {
        name: 'other',
        label: 'Other',
        description: 'Other',
        place_holder: 'Other',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'support_meetings',
        label: 'Attends Support Meetings',
        description: 'Attends Support Meetings',
        place_holder: 'Attends Support Meetings',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'symposium',
        label: 'Attended Mitochondrial Medicine Symposium',
        description: 'Attended Mitochondrial Medicine Symposium',
        place_holder: 'Attended Mitochondrial Medicine Symposium',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'pillar_1',
        label: 'UMDF Pillar Focus #1',
        description: 'UMDF Pillar Focus #1',
        place_holder: 'UMDF Pillar Focus #1',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'pillar_2',
        label: 'UMDF Pillar Focus #2',
        description: 'UMDF Pillar Focus #2',
        place_holder: 'UMDF Pillar Focus #2',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'call_to_action',
        label: 'Call To Action/Reason for Letter',
        description: 'Call To Action/Reason for Letter',
        place_holder: 'Call To Action/Reason for Letter',
        type: 'SELECT',
        required: true,
        options: ['Donate today']
      },
      {
        name: 'state',
        label: 'State',
        description: 'State',
        place_holder: 'State',
        type: 'TEXT',
        required: true,
        options: []
      }
    ],
    context: [
      {
        role: 'system',
        content:
          "You are an AI assistant that works with the United Mitochondrial Disease Foundation (UMDF). You are skilled at creating outreach fundraising letters. You craft these letters based on patient stories, highlighting the patients' personal journeys and what is important to the patient in order to foster a sense of connection from UMDF's followers. Include the patient's state in the call to action; letters will be sent to those in the same state. You do not embellish upon the information given to you and you do not sensationalize or use cliches. Include a bit of backstory on the disease. Do not include any details about the patient that are not given to you."
      }
    ],
    prompt:
      'Patient Name: {name}, Age: {age}, Gender: {gender}, Mother: {mother}, Father: {father}                     Diagnosis: {diagnosis}, Priority 1:{priority_1}, Priority 2:{priority_2}, Other: {other}, Attends Support Meetings: {support_meetings},                     Attended Mitochondrial Medicine Symposium: {symposium}, UMDF Pillar Focus #1: {pillar_1}, UMDF Pillar Focus #2: {pillar_2},                     Call To Action/Reason for Letter: {call_to_action}, State: {state},                     Info for background on Pillar Focus #1 to include in the letter: Cultivating the Best Science is Our Best Hope\nNew studies for patients & families just posted!\nClick here for study opportunities in non-drug related clinical research.\n \n\nClinical Trials\nResearch Grants\nOur Impact\nOur Roadmap to a Cure\nThe Roadmap to a Cure initiative guides the UMDF mission and focuses on three pillars: Diagnosis, Therapeutic Development and Patient Care. We aim to fast-track science, fund infrastructure and push progress across each pillar.\n\n“UMDF is the largest funder of mitochondrial research outside of the federal government.  In the last few years, discovery has streamlined the diagnosis for many and allowed designer therapies to be developed for several rare diseases that may be translatable to mitochondrial diseases.  The Roadmap to a Cure provides direction for obtaining a diagnosis, developing care pathways for patients and finding therapies to alleviate symptoms.”\nDr. Bruce H. Cohen\nChair, UMDF Scientific & Medical Advisory Board\n\nDIAGNOSIS\nThe Challenge\nThe pathway to a mitochondrial disease diagnosis is not standardized.\n\nOur Commitment\nCreate a better diagnostic scenario to identify and characterize mitochondrial disease patients based on health information, genetic testing and bio samples.\n\nOur Strategy\nIncreasing Awareness\nImproving Diagnoses\nDeveloping Tools to Measure Mitochondrial Health/Disease\nTHERAPEUTIC DEVELOPMENT\nThe Challenge\nThere is an absence of well-controlled studies within the field and no licensed therapies for mitochondrial disease in the United States.\n\nOur Commitment\nCoordinate stakeholders in academia, government and the drug development industry to address validated outcome measures, patient-report outcomes and regulatory guidance to gain treatments more efficiently and quickly.\n\nOur Strategy\nFacilitating Drug Development\nIdentifying and Funding Gaps from Basic Science to Clinical Trials\nPATIENT CARE\nThe Challenge\nClinical care for mitochondrial disease patients is often inconsistent, and insurance reimbursement for rare disease care is challenging.\n\nOur Commitment\nLeverage the national focus on personalized medicine to develop programs and tools that will advance, optimize and lead to standards of patient care for the mitochondrial disease community. \n\nOur Strategy\nPersonalized Medicine\nPatient/Clinical Education\nDeveloping Coordinated Care Models\nEstablishing Centers of Excellence\nClinical Trial Opportunities for Patients\nOur best hope for finding treatments and cures is clinical trials. For research studies to be effective, a large amount of data from a large pool of participants is essential. We urge patients to join the fight and engage in clinical trials to help make a difference for future generations.\n\nStay up-to-date on the latest news and updates on clinical trials. Visit the UMDF Clinical Trials page.\n\nLearn More About UMDF’s Research Grant Program\nThe UMDF Research Grant Program was established in 1996 at a time when no other organization existed to fund mitochondrial disease research. Today, UMDF is the largest, non-governmental funder of basic and translational research designed to bring the best science from the bench to bedside.\nAnnual UMDF Grant Prize Winners\nThe UMDF Research Grant Program proudly funds clinicians at every stage of their professional career to cultivate the most promising science.  All submitted research projects are peer reviewed by the top global scientific and medical experts in the mitochondrial research field.\n2023 Prize Winner\nSara Carli\nConor Ronayne, PhD\nDana-Farber Cancer Institute,\nHarvard Medical School\n\nProject Summary\n2022 Prize Winner\nSara Carli\nSara Carli, PhD\nUniversità di\nBologna, Italy\n\nProject Summary\n2021 Prize Winner\n\nLia Mayorga, MD, PhD\nIHEM\nMendoza, Argentina\n\nProject Summary\n2020 Prize Winner\n\nKinsley Christopher Belle\nStanford University\nStanford, CA\n\nProject Summary\n2019 Prize Winner\n\nArwen Gao\nEcole Polytechnique Federale de Lausanne\nLausanne, Switzerland\n\nProject Summary\nAward Winners at MitoMed 2023\nBeyond accelerators, UMDF also announced seven other award winners at MitoMed 2023, including:\n\nVanguard Award – Robert K. Naviaux, MD, PhD\nPrincipal Investigator Grant Award ($100,000) – Anthony Grillo, PhD\nClinical Trial Readiness Grant Award Winner ($100,000) – Anthony Ford-Hutchinson, PhD\nInterested in applying for a UMDF Research Grant?   \nGet the Details\nYour Dollars at Work\nYour donations power our ability to support science dedicated to mitochondrial disease research.\n\n15 million in grants awarded\n150 million stimulated in government grant follow on funding\n125 labs funded and launched\n1 million dedicated to Leigh Syndrome Roadmap Initiative\nMaking an Impact in Drug Development\nUMDF recognizes industry as an essential partner in developing treatments and cures for mitochondrial disease.\n\nINDUSTRY ADVISORY COUNCIL\nFACILITATING DRUG DEVELOPMENT\nA National Organization with a\n\nGlobal Reach\n\nNo single organization can take on mitochondrial disease alone. UMDF has gathered the leading mitochondrial disease patient advocacy groups from around the globe to form and fund The Leigh Syndrome International Consortium. This Roadmap to a Cure project showcases our active dedication to find the best science wherever it is located in the world.\n\n\nUMDF MITO NEXUS\nUMDF interacts with multiple organizations and is the nucleus of many infrastructure projects dedicated to mitochondrial disease clinical research and patient care. UMDF is collaborating with key stakeholders to create a single hub essential for sharing and dispersing critical information to benefit the entire mitochondrial disease community.\n\n\nUMDF stewards mitoSHARE, a worldwide patient-populated registry initiative.\n\n\nUMDF is an executive committee member of the North American Mitochondrial Disease Consortium, a clinical research network funded by NIH.\n\n\nUMDF plays an active role and co-funds the Mitochondrial Care Network to optimize clinical care.\n\n\nUMDF collaborates with the Mitochondrial Disease Sequence Data Resource Consortium, a partnership with Children’s Hospital of Philadelphia to consolidate research data.',
    id: '5eba23d9-07dc-4c2e-92e7-047c89918f69',
    user_id: 'e137ed69-6b04-4efa-b0ea-80e8d90b10c3',
    organization: 'United Mitochondrial Disease Foundation',
    creation_time: '2024-02-28T13:13:27.257523',
    state: 'ACTIVE'
  },
  {
    name: 'Advocacy Letters',
    description: 'This is a template for the Advocacy Letters generation',
    parameters: [
      {
        name: 'name',
        label: 'Patient Name',
        description: 'Patient Name',
        place_holder: 'Patient Name',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'age',
        label: 'Age',
        description: 'Age',
        place_holder: 'Age',
        type: 'TEXT',
        required: false,
        options: []
      },
      {
        name: 'gender',
        label: 'Gender',
        description: 'Gender',
        place_holder: 'Gender',
        type: 'SELECT',
        required: true,
        options: ['Male', 'Female']
      },
      {
        name: 'mother',
        label: "Mother's Name",
        description: "Mother's Name",
        place_holder: 'Mother',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'father',
        label: "Father's Name",
        description: "Father's Name",
        place_holder: 'Father',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'diagnosis',
        label: 'Diagnosis',
        description: 'Diagnosis',
        place_holder: 'Diagnosis',
        type: 'TEXT',
        required: true,
        options: [
          'Mitochondrial Disease, potentially Leigh Syndrome',
          'PolG',
          'Complex 1, Complex 3 Mitochondrial Disease',
          'oxidative phosphorylation deficiency, type 11',
          'CPEO/KSS',
          'MERFF',
          'PDCD',
          'Leigh Syndrome',
          'TK2d',
          'Mitochondrial Disease',
          'MCAD',
          'Mitochondrial disease complex 1 and 3 deficiency',
          'LHON'
        ]
      },
      {
        name: 'priority_1',
        label: 'Priority 1',
        description: 'Priority 1',
        place_holder: 'Priority 1',
        type: 'SELECT',
        required: true,
        options: [
          'Grief Support',
          'LHON Research',
          'New Treatments & Cures',
          'Research',
          'Funding for Research',
          'PolG Research',
          'Access to Specialists',
          'MERFF Research',
          'Leigh Syndrome Research',
          'Early Diagnosis'
        ]
      },
      {
        name: 'priority_2',
        label: 'Priority 2',
        description: 'Priority 2',
        place_holder: 'Priority 2',
        type: 'SELECT',
        required: true,
        options: [
          'Access to Specialists',
          'Advocacy',
          'Clinical Trials',
          'Connecting with other TK2d families',
          'Diagnosis',
          'Helping other patients',
          'New Treatments & Cures',
          'Research',
          'Research, Treatments'
        ]
      },
      {
        name: 'other',
        label: 'Other',
        description: 'Other',
        place_holder: 'Other',
        type: 'TEXT',
        required: true,
        options: []
      },
      {
        name: 'support_meetings',
        label: 'Attends Support Meetings',
        description: 'Attends Support Meetings',
        place_holder: 'Attends Support Meetings',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'symposium',
        label: 'Attended Mitochondrial Medicine Symposium',
        description: 'Attended Mitochondrial Medicine Symposium',
        place_holder: 'Attended Mitochondrial Medicine Symposium',
        type: 'SELECT',
        required: false,
        options: ['Yes', 'No']
      },
      {
        name: 'pillar_1',
        label: 'UMDF Pillar Focus #1',
        description: 'UMDF Pillar Focus #1',
        place_holder: 'UMDF Pillar Focus #1',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'pillar_2',
        label: 'UMDF Pillar Focus #2',
        description: 'UMDF Pillar Focus #2',
        place_holder: 'UMDF Pillar Focus #2',
        type: 'SELECT',
        required: true,
        options: ['Advocacy', 'Education', 'Research', 'Support']
      },
      {
        name: 'call_to_action',
        label: 'Call To Action/Reason for Letter',
        description: 'Call To Action/Reason for Letter',
        place_holder: 'Call To Action/Reason for Letter',
        type: 'SELECT',
        required: true,
        options: ['Donate today']
      },
      {
        name: 'state',
        label: 'State',
        description: 'State',
        place_holder: 'State',
        type: 'TEXT',
        required: true,
        options: []
      }
    ],
    context: [
      {
        role: 'system',
        content:
          "You are an AI assistant that works with the United Mitochondrial Disease Foundation (UMDF). You are skilled at creating outreach fundraising letters. You craft these letters based on patient stories, highlighting the patients' personal journeys and what is important to the patient in order to foster a sense of connection from UMDF's followers. Include the patient's state in the call to action; letters will be sent to those in the same state. You do not embellish upon the information given to you and you do not sensationalize or use cliches. Include a bit of backstory on the disease. Do not include any details about the patient that are not given to you."
      }
    ],
    prompt:
      'Patient Name: {name}, Age: {age}, Gender: {gender}, Mother: {mother}, Father: {father}                     Diagnosis: {diagnosis}, Priority 1:{priority_1}, Priority 2:{priority_2}, Other: {other}, Attends Support Meetings: {support_meetings},                     Attended Mitochondrial Medicine Symposium: {symposium}, UMDF Pillar Focus #1: {pillar_1}, UMDF Pillar Focus #2: {pillar_2},                     Call To Action/Reason for Letter: {call_to_action}, State: {state},                     Info for background on Pillar Focus #1 to include in the letter: Advocacy Center\nJoin the Fight!\n\nCongress needs to hear your voice! The UMDF Advocacy Center is your one-stop page for supporting legislation that helps move mitochondrial disease research, education and support forward.  \n\nRead our latest news, sign-up for future congressional visits, or take action today via our UMDF Action Center.\n\n \n\nSign Up for Future Capitol Hill Visits (Virtual or In-Person)\nMeet the Members of Mitochondrial Disease House Caucus\n\nUMDF Advocacy Action Center\nClick on the “Take Action” button below to contact your Congressional members around legislation important to the mitochondrial disease community via our Ignite Advocacy platform. \nUMDF ADVOCACY\nACTION ITEM\nEncourage Members of Congress to Support the Medical Nutrition Equity Act (MNEA)\nMedical Nutrition Equity Act Image\nTake Action\nUMDF ADVOCACY\nACTION ITEM\nAsk Your House Rep to Join the Mitochondrial Disease Caucus\nMitochondrial Disease Congressional Caucus \nTake Action\nOTHER ACTION ITEMS\nFROM UMDF PARTNERS\nEncourage a “fair, equitable and appropriate review” of\nelamipretide by the FDA\nMitochondrial Disease Congressional Caucus \nTake Action\nThanks to UMDF Advocacy Efforts…\n$60M of mitochondrial disease research from the U.S. Department of Defense\n$100M+ from National Institutes of Health\n30+ members of the Mitochondrial Disease Caucus in the U.S. House of Representatives\n1000+ total UMDF Advocates pushing for mito-friendly legislation\nAdvocacy News \nRead up on the latest advocacy news affecting mitochondrial disease patients, research, clinical care and more.\nAdvocacy Update – December 2023\nDec 19, 2023\n\nUMDF Advocacy Update – Dec. 2023 The House is scheduled to be out of session until January, while the Senate is scheduled to remain in session this week to continue to work toward an agreement on funding for Ukraine, Israel, and US border reform, as well as...\n\nRead More\nAdvocacy Update – November 2023: CMS Changes Definition of Medicare Caregiver in New Rule\nNov 29, 2023\n\nPublished 11/29/23 President Biden Signs Funding Bill, Averting a Government Shutdown On November 16, President Biden signed the stopgap funding bill passed by the House and Senate. The short-term two-tiered spending bill includes temporary extensions of expiring...\n\nRead More\nLanguage Encouraging NIH to “Expand, Accelerate, and Collaborate” on Mito Research Makes it in HHS Appropriations Report \nOct 24, 2023\n\nPublished 10/24/23; Updated 10/25/23, 4:30 pm ET The wait for a new House of Representatives speaker has ended with Rep. Mike Johnson of Louisiana. With that business handled, looming large is the emergency supplemental spending package for Israel and Ukraine, which...\n\nRead More\nMarking #WorldMitoWeek Through Advocacy \nSep 25, 2023\n\n(Sept. 23, 2023) As we wind down the final days of World Mitochondrial Disease Week, we want to take a moment to thank the UMDF advocates who helped us have over 100 touchpoints with Congress this Wednesday on UMDF’s Virtual Capitol Hill Day. Thanks to your passionate...\n\nRead More\nUMDF Reacts to Today’s Historic FDA Listening for the Mitochondrial Disease PDCD\nSep 8, 2023\n\n(Sept. 8, 2023) Earlier today, the United Mitochondrial Disease Foundation (UMDF) cohosted a listening session with the U.S. Food and Drug Administration (FDA) with fellow advocacy group MitoAction regarding the mitochondrial disease Pyruvate Dehydrogenase Complex...\n\nRead More\nAdvocacy Update – May 2023: What Does the End of the Public Health Emergency Mean for Medicaid?\nMay 25, 2023\n\nUMDF Washington Update – May 25, 2023  Debt Limit Negotiations Continue   House Speaker Kevin McCarthy (R-Calif.) met with President Joe Biden on May 22, 2023, and had a "productive discussion," but they have not yet reached a deal on raising the U.S. debt ceiling....\n\nRead More\nAdvocacy Update – April 2023: Spring on Capitol Hill\nApr 26, 2023\n\nCongress recently returned from its two-week spring recess, kicking off a busy work period leading to the Memorial Day recess. This week, four House committees held health-related hearings, and the Senate HELP Committee is expected soon to take up Pharmacy Benefit...\n\nRead More\nAdvocacy Update – March 2023: Federal Appropriations 101 and Why Advocacy Matters for Mito\nMar 23, 2023\n\nEvery year, UMDF, with help from the Congressional Mitochondrial Disease Caucus (co-chaired by Reps. Fitzpatrick (R-PA) and McGovern (D-MA) work to educate Congress on federal funding priorities for mitochondrial disease. Specifically, we advocate...\n\nRead More\nAdvocacy Update – February 2023: Could ARPA-H Change the Research Landscape for Rare Diseases?\nFeb 22, 2023\n\nFor many years, UMDF has worked to encourage greater mitochondrial disease research funding through the National Institutes of Health (NIH). And we have also worked to direct mitochondrial disease research funding through the Peer Reviewed Medical Research Program of...\n\nRead More\nAdvocacy Update – January 2023: What Does 2023 Hold for Mito Advocacy?\nJan 23, 2023\n\nYear-End Advocacy Success Recap 2022 ended well for UMDF, thanks to the activism of UMDF members, with the final federal funding bill passed and signed by President Biden on December 29th. As mentioned last month, the bill included Department of Defense (DoD) funding...\n\nRead More\nAdvocacy Update – December 2022: Mito Research Funding Looks Headed for Renewal in Newly Unveiled Funding Bill\nDec 21, 2022\n\nOn Tuesday, December 20, 2022, lawmakers unveiled their long-awaited $1.7 trillion government funding package. The package includes 12 appropriations bills, including the Defense Appropriations bill. Thanks to our advocacy efforts, mitochondrial disease continues to...\n\nRead More\nAdvocacy Update – September 2022: Three Things You Should Ask of Congress as We Wrap Up World Mitochondrial Disease Week \nSep 24, 2022\n\nThis week, as part of World Mitochondrial Disease Week, UMDF President & CEO Brian Harman caught up with the offices of several members of Congress to talk about mitochondrial disease and the support we need from the federal government. We wrapped up each call...\n\nRead More\nUMDF Marks World Mitochondrial Disease Week, September 18 – 24, 2022\nSep 16, 2022\n\nThis coming week, September 18 – 24, marks World Mitochondrial Disease Week. It provides a time for the entire mito community to share our joys, our sorrows, our hopes, and our fears. It’s a week when we can reflect on all we’ve collectively accomplished, while...\n\nRead More\nAdvocacy Update – August 2022: The Inflation Reduction Act, Telehealth Extension, FY 2023 Appropriations and more.\nAug 16, 2022\n\nCongress Passes the Inflation Reduction Act Congress ended a busy work period after passing the Inflation Reduction Act (IRA) over the weekend. Congress has now adjourned for August recess. The Senate returns on September 6, and the House returns on September...\n\nRead More\nAdvocacy Update – May 2022: CDER Launches Program to Speed Development of Rare Disease Treatments\nMay 19, 2022\n\nThe Food and Drug Administration’s (FDA) Center for Drug Evaluation and Research (CDER) announced the launch of the Accelerating Rare disease Cures (ARC) Program. CDER’s Rare Diseases Team manages the ARC Program. The ARC program’s mission is to speed up the...\n\nRead More\nAdvocacy Update – April 2022\nApr 19, 2022\n\nWhite House Releases Fiscal Year (FY) 2023 Budget Request - Big Proposed Increases for Research On Monday, March 28, 2022, President Biden released his proposed fiscal year (FY) 2023 budget. The president’s budget request starts the Congressional budget process. The...\n\nRead More\nAdvocacy Update – March 2022\nMar 17, 2022\n\nOmnibus Bill Includes 151-Day Extension of Telehealth Waivers Earlier this week, President Biden signed a bill to fund the government through September (the fiscal year 2022) and send humanitarian aid to Ukraine.  The bill also included several health priorities,...\n\nRead More\nUMDF’s 2022 Congressional Outlook\nFeb 15, 2022\n\nUnited Mitochondrial Disease Foundation 2022 Congressional Outlook As it reconvenes, Congress faces a packed agenda in a legislative year that will be shortened by the upcoming midterm elections and remains buffeted by the persistent coronavirus pandemic. The list of...\n\nRead More\nUMDF Updates Congress on Telehealth\nJun 14, 2021\n\nBefore the pandemic, telehealth coverage was limited in scope. However, the Centers for Medicare & Medicaid Services (CMS) and Congress expanded coverage to encourage broad adoption of telehealth for the duration of the public health emergency. Accordingly, we have seen an exponential increase in telehealth.\n\nRead More\nPowerhouse Podcast Episode #1 – A Conversation Adult Patient Brandon Leach\nJan 25, 2021\n\nPowerhouse Podcast Episode #1 UMDF President and CEO Brian Harman and Science and Alliance Officer Dr. Phil Yeske debut the Powerhouse Podcast with a conversation with Brandon Leach. Brandon is a resilient young adult patient navigating mitochondrial disease, college...\n\nRead More',
    id: '4c09c171-6080-48c5-8614-7e1006c2f84a',
    user_id: 'e137ed69-6b04-4efa-b0ea-80e8d90b10c3',
    organization: 'United Mitochondrial Disease Foundation',
    creation_time: '2024-02-28T13:13:53.835246',
    state: 'ACTIVE'
  }
];

const ContentGenerationForm: React.FC<IContentGenerationForm> = ({}) => {
  const [contentGenerationTemplates, setContentGenerationTemplates] = useState<any[]>(ALL_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<GetContentGenerationTemplate_Out>();
  const [formData, setFormData] = useState<any>({});
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [isDataSubmitting, setIsDataSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [sendNotification] = useNotification();

  const fetchAllContentGenerartionTemplates = async () => {
    setIsLoading(true);
    try {
      const response: GetMultipleContentGenerationTemplate_Out = await ContentGenerationTemplatesService.getAllContentGenerationTemplates();
      setContentGenerationTemplates(ALL_TEMPLATES);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleFormDataChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleTemplateChange = (event: any) => {
    const template = contentGenerationTemplates.find((template) => template.name === event.target.value);
    setSelectedTemplate(template);
  };

  const handleGenderChange = (event: any) => {
    setSelectedGender(event.target.value);
    handleFormDataChange(event);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'TEXT':
      case 'STRING':
      case 'EMAIL':
      case 'PHONE':
      case 'URL':
        return (
          <TextField
            name={field.name}
            fullWidth
            className={styles.inputStyle}
            type="text"
            placeholder={field.place_holder}
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
          />
        );
      case 'NUMBER':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="number"
            placeholder={field.place_holder}
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
          />
        );
      case 'DATE':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="date"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'TIME':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="time"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'DATETIME':
        return (
          <TextField
            fullWidth
            type="datetime-local"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'TEXTAREA':
        return (
          <>
            <Typography>{field.description}</Typography>
            <TextField
              name={field.name}
              fullWidth
              multiline
              rows={6}
              placeholder={field.place_holder}
              required={field.required}
              onChange={handleFormDataChange}
              sx={{
                width: '100%'
              }}
            />
          </>
        );
      case 'SELECT':
        if (field.name === 'gender') {
          return (
            <FormControl fullWidth>
              <InputLabel
                id={field.place_holder}
                sx={{
                  backgroundColor: 'white',
                  paddingX: '5px'
                }}
              >
                {field.place_holder}
              </InputLabel>
              <Select
                labelId={`${field.name}-label`}
                name={field.name}
                onChange={handleGenderChange}
                value={selectedGender}
                required={field.required}
              >
                {field.options.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {selectedGender === 'Other' && (
                <TextField
                  fullWidth
                  type="text"
                  name={`${field.name}-other`}
                  variant="outlined"
                  placeholder="Please specify (optional)"
                  onChange={handleFormDataChange}
                  sx={{
                    marginTop: '10px'
                  }}
                />
              )}
            </FormControl>
          );
        } else {
          return (
            <FormControl fullWidth>
              <InputLabel
                id={field.place_holder}
                sx={{
                  backgroundColor: 'white',
                  paddingX: '5px'
                }}
              >
                {field.place_holder}
              </InputLabel>
              <Select required={field.required} onChange={handleFormDataChange} labelId={field.place_holder} name={field.name}>
                {field.options.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const body = {
      template_id: selectedTemplate?.id as string,
      values: formData
    };
    setIsDataSubmitting(true);
    try {
      const response = await ContentGenerationsService.createContentGeneration(body);
      navigate('/content-generation');
      sendNotification({
        msg: 'Content generated successfully',
        variant: 'success'
      });
    } catch (error) {
      console.error(error);
      sendNotification({
        msg: 'Failed to generate content',
        variant: 'error'
      });
    }
    setIsDataSubmitting(false);
  };

  useEffect(() => {
    fetchAllContentGenerartionTemplates();
  }, []);

  return (
    <Box>
      {isDataSubmitting && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" color="white">
            Submitting. Please wait ...
          </Typography>
          <Typography variant="h5" color="white">
            It may take a while, kindly do not refresh the page.
          </Typography>
        </Box>
      )}
      <FormControl
        fullWidth
        sx={{
          marginTop: '40px',
          backgroundColor: 'white'
        }}
      >
        <InputLabel id="template-select-label">Select a Template</InputLabel>
        <Select labelId="template-select-label" value={selectedTemplate} label="Select a Template" onChange={handleTemplateChange}>
          {contentGenerationTemplates.map((template: any) => (
            <MenuItem key={template.id} value={template.name}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Typography>Fetching templates please wait...</Typography>
        </Box>
      )}
      <Typography
        sx={{
          fontSize: '12px',
          fontStyle: 'italic'
        }}
      >
        {selectedTemplate?.description}
      </Typography>
      {selectedTemplate && (
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            marginTop: '20px'
          }}
        >
          <Box>
            {selectedTemplate?.parameters?.map((field: any) => (
              <Box
                key={field.name}
                mt={2}
                sx={{
                  backgroundColor: 'white'
                }}
              >
                {renderField(field)}
              </Box>
            ))}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: '20px'
              }}
              onClick={handleSubmit}
            >
              Generate Content
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContentGenerationForm;
