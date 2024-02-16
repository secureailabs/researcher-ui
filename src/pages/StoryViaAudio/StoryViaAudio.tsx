import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import styles from './StoryViaAudio.module.css';
import { Dropzone, FileMosaic } from '@dropzone-ui/react';
import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export interface IStoryViaAudio {}

const transcribedText =
  " It was the spring of 2011 and as they like to say in commencement speeches, I was getting ready to enter the real world. I had recently graduated from college and moved to Paris to start my first job. My dream was to become a war correspondent but the real world that I found took me into a really different kind of conflict zone. At 22 years old, I was diagnosed with leukemia. The doctors told me and my parents point blank that I had about a 35% chance of long-term survival. I couldn't wrap my head around what that prognosis meant but I understood that the reality and the life I'd imagined for myself had shattered. Over night I lost my job, my apartment, my independence and I became patient number 5624. Over the next four years of chemo, a clinical trial and a bone marrow transplant, the hospital became my home, my bed, the place I live 24-7. Since it was unlikely that I'd ever get better, I had to accept my new reality. I adapted, I became fluent in medical ease, made friends with a group of other young cancer patients, built a vast collection of neon wigs, and learned to use my rolling IV pole as a skateboard. I even achieved my dream of becoming a war correspondent, although not in the way I'd expected. It started with a blog reporting from the frontlines of my hospital bed and it morphed into a column I wrote for the New York Times called Life Interrupted. But, thanks. But above all else, my focus was on surviving and spoiler alert. I did survive. Yeah. Thanks to an army of supportive humans, I'm not just still here, I am choured of my cancer. So, when you go through a traumatic experience like this, people treat you differently. They start telling you how much of an inspiration you are. They say you're a warrior. They call you a hero, someone who's lived the mythical hero's journey, who's endured impossible trials and against the odds lived to tell the tale. Returning better and braver for what you've been through. And this definitely lines up with my experience. Cancer totally transformed my life. I left the hospital knowing exactly who I was and what I wanted to do in the world. And now, every day, as the sun rises, I drink a big glass of celery juice and I follow this up with 90 minutes of yoga. Then I write down 50 things I'm grateful for. I'm to a scroll of paper that I fold into an origami crane and sense sailing out my window. Are you seriously believing any of this? I don't do any of these things. I hate yoga and I have no idea how to fold an origami crane. The truth is that for me, the hardest part of my cancer experience began once the cancer was gone. That heroic journey of the survivor we see in movies and watch play out on Instagram, it's a myth. It isn't just untrue, it's dangerous because it erases the very real challenges of recovery. Now, don't get me wrong, I'm incredibly grateful to be alive and I'm painfully aware that this struggle is a privilege that many don't get to experience. But it's important that I tell you what this projection of heroism and expectation of constant gratitude does to people who are trying to recover. Because being cured is not where the work of healing ends. It's where it begins. I'll never forget the day I was discharged from the hospital, finally done with treatment. Those four years of chemo had taken a toll on my relationship with my longtime boyfriend and he'd recently moved out. And when I walked into my apartment, it was quiet, eerily so. The person I wanted to call in this moment, the person who I knew would understand everything was my friend Melissa. She was a fellow cancer patient, but she had died three weeks earlier. As I stood there in the doorway of my apartment, I wanted to cry, but I was too tired to cry. The adrenaline was gone. It felt as if the inner scaffolding that it held me together since my diagnosis had suddenly crumbled. I had spent the past 1,500 days working tirelessly to achieve one goal to survive. And now that I've done so, I realized I had absolutely no idea how to live. On paper, of course, I was better. I didn't have leukemia. The my blood counts were back to normal and the disability checks soon stopped coming. To the outside world, I clearly didn't belong in the kingdom of the sick anymore. But in reality, I never felt further from being well. All that chemo had taken a permanent physical toll on my body. I wondered what kind of job can I hold when I need to nap for four hours in the middle of the day, when my misfiring immune system still sends me to the ER on a regular basis. And then there were the invisible psychological imprints my illness had left behind. The fears of relapse, the unprocessed grief, the demons of PTSD that descended upon me for days, sometimes weeks. See, we talk about reentry in the context of war and incarceration. But we don't talk about it as much in the context of other kinds of traumatic experiences, like an illness. Because no one had warned me of the challenges of reentry, I felt something must be wrong with me. I felt ashamed. And with great guilt, I kept reminding myself of how lucky I was to be alive at all when so many people like my friend Melissa were not. But on most days, I woke up feeling so sad and lost I could barely breathe. Sometimes I even fantasized about getting sick again. And let me tell you, there are so many better things to fantasize about when you're in your 20s and recently single. But I missed the hospital's ecosystem. Like me, everyone in there was broken. But out here, among the living, I felt like an imposter, overwhelmed and unable to function. I also missed the sense of clarity I'd felt at my sickest. Staring your mortality straight in the eye has a way of simplifying things, of rerouting your focus to what really matters. And when I was sick, I vowed that if I survived, it had to be for something. It had to be to live a good life, an adventurous life, a meaningful one. But the question, once I was cured, became how? I was 27 years old, but no job, no partner, no structure. At the time, I didn't have treatment protocols or discharge instructions to help guide my way forward. But what I did have was an inbox full of internet messages from strangers. Over the years, people from all over the world had read my column, and they'd responded with letters, comments, and emails. It was a mix, as is often the case for writers. I got a lot of unsolicited advice about how to cure my cancer with things like essential oils. I got some questions about my broad size, but mostly, I heard from people who, in their own different way, understood what it was that I was going through. I heard from a teenage girl in Florida, who, like me, was coming out of chemo, and wrote me a message composed largely of emojis. I heard from a retired art history professor, in Ohio, named Howard, who'd spent most of his life struggling with a mysterious, debilitating health condition that he'd had from the time he was a young man. I heard from an inmate on death row in Texas by the name of little GQ, short for gangster Quinn. He'd never been sick a day in his life. He does a thousand push ups to start off each morning, but he related to what I described in one column as my incansoration, and to the experience of being confined to a tiny fluorescent room. I know that our situations are different, he wrote to me, but the threat of death lurks in both of our shadows. And those lonely first weeks and months of my recovery, these strangers and their words became lifelines. Dispatches from people of so many different backgrounds with so many different experiences all showing me the same thing. You can be held hostage by the worst thing that's ever happened to you, and allow it to hijack your remaining days, or you can find a way forward. I knew I needed to make some kind of change. I wanted to be in motion, again, to figure out how to unstuck myself and to get back out into the world. And so I decided to go on a real journey, not the bullshit cancer one or the mythical hero's journey that everyone thought I should be on, but a real pack your bags kind of journey. I put everything I owned into storage, rented out my apartment, borrowed a car, and talked a very dear, but somewhat smelly friend into joining me. Together, my dog Oscar and I embarked on a 15,000 mile road trip around the United States. Along the way, we visited some of those strangers who'd written to me. I needed their advice also to say to them, thank you. I went to Ohio and stayed with Howard, the retired professor. When you've suffered a loss or a trauma, the impulse can be to guard your heart. But Howard urged me to open myself up to uncertainty, to the possibilities of new love, new loss. Howard will never be cured of illness. And as a young man, he had no way of predicting how long he'd live, but that didn't stop him from getting married. Howard has grandkids now and takes weekly ballroom dancing lessons with his wife. When I visited them, they'd recently celebrated their 50th anniversary. In his letter to me, he'd written, meaning is not found in the material realm. It's not in dinner, jazz, cocktails, or conversation. Meaning is what's left when everything else is stripped away. I went to Texas and I visited Little GQ on death row. He asked me what I did to pass all that time I'd spent in a hospital room. When I told him I got really, really good at Scrabble, he said, me too. I explained how, even though he spends most of his days in solitary confinement, he and his neighboring prisoners make board games out of paper and call out their plays through their meal slots. A testament to the incredible tenacity of the human spirit and our ability to adapt with creativity. And my last stop was in Florida to see that teenage girl who sent me all those emojis. Her name is Unique, which is perfect, because she's the most luminous, curious person I've ever met. I asked her what she wants to do next and she said, I want to go to college and travel and eat weird foods like octopus that I've never tasted before and come visit you in New York and go camping, but I'm scared of bugs, but I still want to go camping. I live in awe of her that she could be so optimistic and so full of plans for the future given everything she'd been through. But as Unique showed me, it is far more radical and dangerous to have hope than to live hemmed in by fear. But the most important thing I learned on that road trip is that the divide between the thick and the well, it doesn't exist. The border is porous as we live longer and longer, surviving illnesses and injuries that would have killed our grandparents, even our parents. The vast majority of us will travel back and forth between these realms, spending much of our lives somewhere between the two. These are the terms of our existence. Now, I wish I could say that since coming home from my road trip, I feel fully healed. I don't. But once I stopped expecting myself to return to the person I'd been pre-diagnosis, once I learned to accept my body and its limitations, I actually did start to feel better. And in the end, I think that's the trick to stop seeing our health as binary between thick and healthy, well and unwell, whole and broken. And to stop thinking that there's some beautiful, perfect state of wellness to strive for, and to quit living in a state of constant dissatisfaction until we reach it. Every single one of us will have our life interrupted, whether it's by the ripcord of a diagnosis or some other kind of heartbreak or trauma that brings us to the fore. We need to find ways to live in the in between place, managing whatever body and mind we currently have. Sometimes all it takes is the ingenuity of a handmade game of Scrabble, or finding that stripped down kind of meaning in the love of family and a night on the ballroom dance floor. Or that radical, dangerous hope that I'm guessing will someday lead a teenage girl terrified of bugs to go camping. If you're able to do that, then you've taken the real hero's journey. You've achieved what it means to actually be well, which is to say, alive in the messiest, richest, most whole sense. Thank you. That's all I've got. Thank you. Thank you.";

const StoryViaAudio: React.FC<IStoryViaAudio> = ({}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [videoLink, setVideoLink] = useState<string>('');

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [showTranscribedText, setShowTranscribedText] = useState<boolean>(false);

  const updateFiles = (incommingFiles: any) => {
    setFiles(incommingFiles);
  };

  const handleTranscribeVideoClick = () => {
    console.log('Transcribe Video');
    if (videoLink === '' && files.length === 0) {
      alert('Please provide a video link or upload a video');
    } else {
      // wait for 5 seconds and then show the transcribed text
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setShowTranscribedText(true);
      }, 5000);
    }
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <TextField
          sx={{
            width: '100%'
          }}
          id="outlined-basic"
          label="Paste a link to a audio"
          variant="outlined"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </Box>
      <Box>OR</Box>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Dropzone onChange={updateFiles} value={files} label="Upload an audio" footer={false}>
          {files.map((file) => (
            <FileMosaic {...file} preview />
          ))}
        </Dropzone>
      </Box>
      <Box>Or</Box>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography variant="h6">Record an audio</Typography>
        <AudioRecorder onRecordingComplete={(blob: any) => addAudioElement(blob)} recorderControls={recorderControls} />
      </Box>

      <Box>
        <Button variant="contained" color="primary" onClick={handleTranscribeVideoClick}>
          Transcribe Audio
        </Button>
      </Box>
      {showLoading && (
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <CircularProgress />
          <p>Transcribing Audio...</p>
        </Box>
      )}
      {showTranscribedText && (
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box
            sx={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <h3>Transcribed Text</h3>
            <p>{transcribedText}</p>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StoryViaAudio;
