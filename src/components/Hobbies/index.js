import React, {useState} from 'react';

// import abstraction from '../../abstraction.html';
import painting1 from '../../painting1.JPG';
import painting2 from '../../painting2.JPG';
import pastel1 from '../../pastel1.jpg';
import digital1 from '../../digital1.jpg';
import digital2 from '../../digital2.jpg'; 
import digital3 from '../../digital3.jpg'; 
import digital4 from '../../digital4.jpg';
import digital5 from '../../digital5.jpg'; 
import digital6 from '../../digital6.jpg'; 
import digital7 from '../../digital7.jpg'; 
import photo1 from '../../photo1.jpg'; 
import collage1 from '../../collage1.jpg';

import inTheBeginning from '../../inthebeginning.wav';
import myMommaRuledThere from '../../mymommaruledthere.wav';
import rockstar80s from '../../rockstar80s.wav';
import somethingLightSample from '../../somethinglightsample.wav';
import helloChamp from '../../champ.wav';

import './hobbies.css'

import TextModal from '../HtmlModal';
import ImageModal from '../ImageModal';

const songList = [
    {
        title: 'Song 1',
        length: '0:00 - 2:20',
        audio: new Audio(inTheBeginning) 
      },
      {
        title: 'Song 2',
        length: '0:00 - 3:45',
        audio: new Audio(myMommaRuledThere)
      },
      {
        title: 'Song 3',
        length: '0:00 - 4:10',
        audio: new Audio(rockstar80s) 
      },
      {
        title: 'Song 4',
        length: '0:00 - 2:50',
        audio: new Audio(somethingLightSample) 
      },
      {
        title: 'Song 5',
        length: '0:00 - 1:30',
        audio: new Audio(helloChamp) 
      },
  ];

  const textFiles = [
    { name: 'Abstraction', file: require('../../abstraction.txt') },
    { name: 'train ride to wherever', file: require('../../train.txt')},
    { name: 'Friday Night Ponderings', file: require('../../friday.txt')},
    { name: 'Sartre: Existentialism', file: require('../../final.txt')}
];

  const artImages = [
    painting1, painting2, digital1, digital2,
    digital3, digital4, digital5, digital6,
    digital7, pastel1, photo1, collage1
  ]

const Hobbies = () => {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeContent, setActiveContent] = useState(null);
    const [enlargedImage, setEnlargedImage] = useState(null);

    const openEnlargedImage = (imageSrc) => {
        setEnlargedImage(imageSrc);
    };

    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    const openModal = (content) => {
        setActiveContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setActiveContent(null);
        setModalOpen(false);
    };

    const handleAudioClick = (index) => {
      if (currentAudioIndex === index) {
        if (songList[index].audio.paused) {
          songList[index].audio.play();
        } else {
          songList[index].audio.pause();
        }
      } else {
        if (currentAudioIndex !== null) {
          songList[currentAudioIndex].audio.pause();
        }
        songList[index].audio.play();
        setCurrentAudioIndex(index);
      }
    };

    return (
        <div className="hobbies-container">
          <div className="content-section music">
              <div className="music-files">
                {songList.map((song, index) => (
                    <div className="audio-div" key={index}>
                    <div className={`song-square ${currentAudioIndex === index && !song.audio.paused ? 'playing' : ''}`} onClick={() => handleAudioClick(index)}>
                        <div className="play-pause-button">
                        {currentAudioIndex === index && !song.audio.paused ? '❚❚' : '▶'}
                        </div>
                        {/* <div className="song-title">{song.title}</div> */}
                    </div>
                    </div>
                ))}
              </div>
        </div>

                <div className="content-section art">
                <div className="art-images">
                  {artImages.map((imageSrc, index) => (
                    <div
                      key={index}
                      className="image-container"
                      onClick={() => openEnlargedImage(imageSrc)}
                    >
                      <img src={imageSrc} alt={`${index}`} />
                    </div>
                  ))}
                </div>
                {enlargedImage && (
                  <ImageModal imageSrc={enlargedImage} onClose={closeEnlargedImage} />
                )}
              </div>

            <div className="content-section writings">
            <div className="document-list">
                    {textFiles.map((file, index) => (
                        <button key={index} onClick={() => openModal(file)}>
                            {file.name}
                        </button>
                    ))}
                </div>
                {isModalOpen && activeContent && (
                    <TextModal textContent={activeContent} onClose={closeModal} />
                )}
            </div>
        </div>
    );
};

export default Hobbies;
