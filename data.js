const QUIZ_RESULT_THRESHOLD = [
    {
        label: 'Низький',
        maxScore: 12
    },
    {
        label: 'Середній',
        maxScore: 25
    },
    {
        label: 'Високий',
        maxScore: 40
    },
    // {
    //     label: 'Дуже високий',
    //     maxScore: 40
    // }
];


const QUIZ_QUESTIONS = [
    {
        number: 1,
        title: 'Були засмучені через те, що сталося несподівано?',
        answers: [
            {
                value: '0',
                label: 'ніколи',
                type: 'radio'
            },
            {
                value: '1',
                type: 'radio',
                label: 'майже ніколи',
            },
            {

                value: '2',
                label: 'іноді',
                type: 'radio'
            },
            {

                value: '3',
                label: 'досить часто',
                type: 'radio'
            },
            {

                value: '4',
                label: 'дуже часто',
                type: 'radio'
            }
        ]
    },
    {
        number: 2,
        title: 'Відчували, що не можете контролювати важливі речі у своєму житті?',
        answers: [
            {
                label: 'ніколи',
                value: '0',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '1',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '3',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '4',
                type: 'radio'
            }
        ]
    },
    {
        number: 3,
        title: 'Відчували нервозність і стрес?',
        answers: [
            {
                label: 'ніколи',
                value: '0',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '1',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '3',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '4',
                type: 'radio'
            }
        ]
    },
    {
        number: 4,
        title: 'Відчували впевненість у своїй здатності впоратися зі своїми особистими проблемами?',
        answers: [
            {
                label: 'ніколи',
                value: '4',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '3',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '1',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '0',
                type: 'radio'
            }
        ]
    },
    {
        number: 5,
        title: 'Відчували, що все йде по плану?',
        answers: [
            {
                label: 'ніколи',
                value: '4',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '3',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '1',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '0',
                type: 'radio'
            }
        ]
    },
    {
        number: 6,
        title: 'Помічали, що не можете впоратися з усіма справами, які ви повинні були зробити?',
        answers: [
            {
                value: '0',
                label: 'ніколи',
                type: 'radio'
            },
            {
                value: '1',
                type: 'radio',
                label: 'майже ніколи',
            },
            {

                value: '2',
                label: 'іноді',
                type: 'radio'
            },
            {

                value: '3',
                label: 'досить часто',
                type: 'radio'
            },
            {

                value: '4',
                label: 'дуже часто',
                type: 'radio'
            }
        ]
    },
    {
        number: 7,
        title: 'Могли контролювати роздратування у своєму житті?',
        answers: [
            {
                label: 'ніколи',
                value: '4',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '3',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '1',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '0',
                type: 'radio'
            }
        ]
    },
    {
        number: 8,
        title: 'Відчували, що перебуваєте на висоті?',
        answers: [
            {
                label: 'ніколи',
                value: '4',
                type: 'radio'
            },
            {
                label: 'майже ніколи',
                value: '3',
                type: 'radio'
            },
            {
                label: 'іноді',
                value: '2',
                type: 'radio'
            },
            {
                label: 'досить часто',
                value: '1',
                type: 'radio'
            },
            {
                label: 'дуже часто',
                value: '0',
                type: 'radio'
            }
        ]
    },
    {
        number: 9,
        title: 'Злилися через те, що сталося поза вашим контролем?',
        answers: [
            {
                value: '0',
                label: 'ніколи',
                type: 'radio'
            },
            {
                value: '1',
                type: 'radio',
                label: 'майже ніколи',
            },
            {

                value: '2',
                label: 'іноді',
                type: 'radio'
            },
            {

                value: '3',
                label: 'досить часто',
                type: 'radio'
            },
            {

                value: '4',
                label: 'дуже часто',
                type: 'radio'
            }
        ]
    },
    {
        number: 10,
        title: 'Відчували, що труднощі накопичуються настільки, що ви не можете їх подолати?',
        answers: [
            {
                value: '0',
                label: 'ніколи',
                type: 'radio'
            },
            {
                value: '1',
                type: 'radio',
                label: 'майже ніколи',
            },
            {

                value: '2',
                label: 'іноді',
                type: 'radio'
            },
            {

                value: '3',
                label: 'досить часто',
                type: 'radio'
            },
            {

                value: '4',
                label: 'дуже часто',
                type: 'radio'
            }
        ]
    },
];