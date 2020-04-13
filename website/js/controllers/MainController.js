app.controller('MainController', ['$scope', function ($scope) {
    $scope.mentorProfiles = [
        {
            "fname": "William",
            "lname": "Diaz",
            "title": "Passionate Student at BITS-Pilani",
            "bio": "I was an undergraduate student at BITS-Pilani. I am a tech enthusiast trying hands-on scripting and computer automation, dev in C++/Java, Parallel programming paradigms",
            "rating": "4.5",
            "imageUrl": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "teachingSubjects": [
                {
                    "subjectName": "Android Programming"
                },
                {
                    "subjectName": "Artifical Intelligence"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Rose",
            "lname": "Baker",
            "title": "C++ Programming tutor",
            "bio": "I was born in Toronto to parents of Hong Kong descendent. Throughout my childhood, I was enrolled as a student at a Kumon Learning Centre in their math program. I...",
            "imageUrl": "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.0",
            "teachingSubjects": [
                {
                    "subjectName": "C++"
                },
                {
                    "subjectName": "Python"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Billy",
            "lname": "Bryant",
            "title": "Tutor for 9 years",
            "bio": "I have been a student tutor since freshman year of my high school, I am currently a senior at the University of Kansas. I tutored my classmates in the classes I am...",
            "imageUrl": "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.0",
            "teachingSubjects": [
                {
                    "subjectName": "Java"
                },
                {
                    "subjectName": "Computer Networking"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Craig",
            "lname": "Reed",
            "title": "Co-Founder at Edukar since March 2018",
            "bio": "I am a current undergrad at Birla Institute of Technology and Science, Pilani a prestigious engineering college in India. I love to swim, read books on financial...",
            "imageUrl": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "3.0",
            "teachingSubjects": [
                {
                    "subjectName": "HTML/CSS"
                },
                {
                    "subjectName": "Databases"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Sharon",
            "lname": "White",
            "title": "University Student tutor, always on hand and willing to help",
            "bio": "I am currently 20 years old, studying in Cluj-Napoca, Romania. I love to impart my knowledge to others. It is a truly fulfilling activity, especially when seeing the...",
            "imageUrl": "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "3.0",
            "teachingSubjects": [
                {
                    "subjectName": "Databases"
                },
                {
                    "subjectName": "MATLAB"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Mark",
            "lname": "Thompson",
            "title": "Knowledgeable UCLA Student",
            "bio": "Aditya is a student at UCLA, studying Biomedical Engineering, looking to help others learn and grow themselves in a fun and engaging way.",
            "imageUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "3.0",
            "teachingSubjects": [
                {
                    "subjectName": "MIPS"
                },
                {
                    "subjectName": "SAS"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Patrick",
            "lname": "Hernandez",
            "title": "theoretical scientist",
            "bio": "Yuriy Sereda, visiting assistant professor at Indiana University. Conducts scientific research in the field of modeling biomolecular and other nanosystems related to...",
            "imageUrl": "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "3.5",
            "teachingSubjects": [
                {
                    "subjectName": "Web Design"
                },
                {
                    "subjectName": "Web Development"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Stephanie",
            "lname": "Morris",
            "title": "Experienced physics, math and language tutor",
            "bio": "I’m Fatema. I am an Electronics and Communications Engineering junior student at the American University in Cairo. I am a Science and Math lover. Passionate about...",
            "imageUrl": "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "5.0",
            "teachingSubjects": [
                {
                    "subjectName": "Python"
                },
                {
                    "subjectName": "C++"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Benjamin",
            "lname": "Torres",
            "title": "Scientist in Technical University of Munich (TUM)",
            "bio": "Currently working as researcher in a CNRS lab in Paris within University Paris Saclay as part of masters thesis for M.Sc in Computational Mechanics program I am pursuing...",
            "imageUrl": "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.0",
            "teachingSubjects": [
                {
                    "subjectName": "Web Development"
                },
                {
                    "subjectName": "MIPS"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Joyce",
            "lname": "Cook",
            "title": "Freelance Software Engineer",
            "bio": "My interest in computer science started when I was in 6th grade. I started writing computer programs from then only. I worked really hard in order to get into a tier 1...",
            "imageUrl": "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "5.0",
            "teachingSubjects": [
                {
                    "subjectName": "Computer Networking"
                },
                {
                    "subjectName": "HTML/CSS"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Amanda",
            "lname": "Bailey",
            "title": "Tutor for 12 years. Software Engineer 2 at Microsoft",
            "bio": "A tutor for last 12 years, teaching is my passion. A math enthusiast and Computer Science whiz-kid, I am currently Senior Developer at Microsoft. I am a kind,",
            "imageUrl": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.5",
            "teachingSubjects": [
                {
                    "subjectName": "C++"
                },
                {
                    "subjectName": "Artifical Intelligence"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Dennis",
            "lname": "Washington",
            "title": "Past Research Assistant at NUS, Software Developer, Incoming SDE at Oracle",
            "bio": "I am an incoming Software Developer at Oracle. I worked as a research assistant at the NUS- Singtel Cybersecurity Lab with the IoT Security team under Dr. Biplab Sikdar.",
            "imageUrl": "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.0",
            "teachingSubjects": [
                {
                    "subjectName": "Python"
                },
                {
                    "subjectName": "MIPS"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Raymond",
            "lname": "Rodriguez",
            "title": "Senior Project Engineering at IIT Kanpur",
            "bio": "Teaching has always been an integral part of my work-style. I did my graduation from KIIT University Bhubaneswar and had an enthusiasm for higher studies. This en-rooted...",
            "imageUrl": "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "3.5",
            "teachingSubjects": [
                {
                    "subjectName": "Computer Networking"
                },
                {
                    "subjectName": "Databases"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Brandon",
            "lname": "Barnes",
            "title": "Obsessed Programmer and Avid Learner",
            "bio": "Recently graduated student with a Bachelor of Science in Computer Science with a Minor in Business Administration.",
            "imageUrl": "https://images.pexels.com/photos/1484810/pexels-photo-1484810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "4.0",
            "teachingSubjects": [
                {
                    "subjectName": "MATLAB"
                },
                {
                    "subjectName": "Android Programming"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        },
        {
            "fname": "Tina",
            "lname": "Bennett",
            "title": "Subject Matter Expert, Reliable and Friendly Tutor",
            "bio": "I am a graduate with major in mechanical engineering. I have five years of experience in tutoring. I handle subjects like mathematics, physics, chemistry, C++,C,Python...",
            "imageUrl": "https://images.pexels.com/photos/975680/pexels-photo-975680.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "rating": "5.0",
            "teachingSubjects": [
                {
                    "subjectName": "HTML/CSS"
                },
                {
                    "subjectName": "Java"
                }
            ],
            "linkedMentees": [
                {
                    "menteeName": ""
                }
            ]
        }
    ];
}]);