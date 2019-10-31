import auth0 from "auth0-js";
import * as types from "../types/types";
import history from "../history";

const auth = new auth0.WebAuth({
  domain: "dev-hukqki79.auth0.com",
  clientID: "ps5bPqDsjz7LcnR3WO7xG6mSQpHPs2tB",
  redirectUri: "http://localhost:3000/callback",
  audience: "https://dev-hukqki79.auth0.com/api/v2/",
  responseType: "token id_token",
  scope: "openid"
});

const initState = {
  isAuthenticated: false,
  access_token: null,
  id_token: null,
  expires_at: null,
  isDrawerOpen: false,
  selectedQueryDashboardItem: null,
  selectedPage: "queries",
  selectedKeyword: "",
  selectedEmotion: "",
  selectedGroup: 0,
  selectedAnalysisType: 1,
  selectedQueriesType: 1,
  selectedQuery: 0,
  editableQuery: null,
  editableProject: null,
  editableTrafficAnalysis: null,
  addQuery: null,
  addTrafficAnalysis: null,
  addProject: null,
  myBag: [
    {
      name: "گرینلند",
      selected: false
    },
    {
      name: "# پمپئو",
      selected: true
    },
    {
      name: "فلورانس",
      selected: true
    }
  ],
  analysis: [
    {
      id: 1,
      name: "رز میرداماد",
      active: 1,
      date: "12 خرداد 98",
      time: "16:43",
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      }
    },
    {
      id: 2,
      name: "آزادی",
      active: 1,
      date: "18 خرداد 98",
      time: "16:43",
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      }
    },
    {
      id: 3,
      name: "تیراژه",
      active: 0,
      date: "10 خرداد 98",
      time: "16:43",
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      }
    }
  ],
  queries: [
    {
      id: 1,
      name: "ترامپ",
      active: 1,
      social: {
        twitter: 1,
        instagram: 1,
        instagramUsers: ["mohrza"],
        twitterUsers: ["kolimor"]
      },
      retrieved_posts: 682,
      date: "12 خرداد 98",
      time: "16:43",
      selectedProject: {
        id: 1,
        name: "کاله",
        date: "12 خرداد 1398",
        time: "16:43",
        queries: [
          {
            id: 1,
            name: "ماست",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 2,
            name: "صبحانه",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 3,
            name: "سفر",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          }
        ]
      },
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      },
      keywords: ["کتاب"],
      hashtags: ["کتاب"]
    },
    {
      id: 2,
      name: "پرسپولیس",
      active: 1,
      social: {
        twitter: 1,
        instagram: null,
        instagramUsers: ["mohrza"],
        twitterUsers: ["kolimor"]
      },
      retrieved_posts: 682,
      date: "18 خرداد 98",
      time: "16:43",
      selectedProject: {
        id: 1,
        name: "کاله",
        date: "12 خرداد 1398",
        time: "16:43",
        queries: [
          {
            id: 1,
            name: "ماست",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 2,
            name: "صبحانه",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 3,
            name: "سفر",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          }
        ]
      },
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      },
      keywords: ["کتاب"],
      hashtags: ["کتاب"]
    },
    {
      id: 3,
      name: "استادیوم",
      active: 1,
      social: {
        twitter: 1,
        instagram: 1,
        instagramUsers: ["mohrza"],
        twitterUsers: ["kolimor"]
      },
      retrieved_posts: 682,
      date: "10 خرداد 98",
      time: "16:43",
      selectedProject: {
        id: 1,
        name: "کاله",
        date: "12 خرداد 1398",
        time: "16:43",
        queries: [
          {
            id: 1,
            name: "ماست",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 2,
            name: "صبحانه",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 3,
            name: "سفر",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          }
        ]
      },
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      },
      keywords: ["کتاب"],
      hashtags: ["کتاب"]
    },
    {
      id: 4,
      name: "اپل",
      active: 0,
      social: {
        twitter: 1,
        instagram: 1,
        instagramUsers: ["mohrza"],
        twitterUsers: ["kolimor"]
      },
      retrieved_posts: 682,
      date: "10 خرداد 98",
      time: "16:43",
      selectedProject: {
        id: 1,
        name: "کاله",
        date: "12 خرداد 1398",
        time: "16:43",
        queries: [
          {
            id: 1,
            name: "ماست",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 2,
            name: "صبحانه",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          },
          {
            id: 3,
            name: "سفر",
            date: "12 خرداد 1398",
            time: "16:43",
            retrieved_posts: 682,
            active: 1
          }
        ]
      },
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      },
      keywords: ["کتاب"],
      hashtags: ["کتاب"]
    },
    {
      id: 5,
      name: "هنگ کنگ",
      active: 0,
      social: {
        twitter: 1,
        instagram: null,
        instagramUsers: ["mohrza"],
        twitterUsers: ["kolimor"]
      },
      retrieved_posts: 682,
      date: "10 خرداد 98",
      time: "16:43",
      selectedProject: null,
      isDaySelected: true,
      selectedDay: {
        from: {
          year: 1398,
          month: 8,
          day: 14
        },
        to: {
          year: 1398,
          month: 8,
          day: 24
        }
      },
      location: {
        isLocationEnable: true,
        center: [51.4124, 35.7325]
      },
      keywords: ["کتاب"],
      hashtags: ["کتاب"]
    }
  ],
  groups: [
    {
      id: 1,
      name: "سیاست",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: -1,
      comment_emotion: -1
    },
    {
      id: 2,
      name: "آمریکا",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: -1,
      comment_emotion: +1
    },
    {
      id: 3,
      name: "کاخ سفید",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: -1,
      comment_emotion: -1
    },
    {
      id: 4,
      name: "امور خارجه",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: +1,
      comment_emotion: +1
    },
    {
      id: 5,
      name: "واردات",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: +1,
      comment_emotion: -1
    },
    {
      id: 6,
      name: "برجام",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: +1,
      comment_emotion: +1
    },
    {
      id: 7,
      name: "تحریم",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      effective_accounts: 156,
      content_emotion: -1,
      comment_emotion: +1
    }
  ],
  influencers_list: [
    {
      id: 1,
      name: "مرتضی محمدی",
      username: "morteza",
      posts: 8240,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      motivation: 66,
      content_emotion: -1,
      comment_emotion: -1
    },
    {
      id: 2,
      username: "moradi",
      name: "سارا مرادی",
      posts: 6557,
      overall_likes: 4339,
      average_likes: 4339,
      overall_comments: 4339,
      average_comments: 2890,
      motivation: 58,
      content_emotion: +1,
      comment_emotion: +1
    },
    {
      id: 3,
      username: "sirone",
      name: "سیروان",
      posts: 4455,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      motivation: 45,
      content_emotion: +1,
      comment_emotion: -1
    },
    {
      id: 4,
      username: "maryqueen",
      name: "مریم قاسم",
      posts: 3897,
      overall_likes: 4339,
      average_likes: 1455,
      overall_comments: 4339,
      average_comments: 1897,
      motivation: 42,
      content_emotion: +1,
      comment_emotion: +1
    },
    {
      id: 5,
      username: "vtalimar",
      name: "وحید علیمردی",
      posts: 2890,
      overall_likes: 4339,
      average_likes: 966,
      overall_comments: 4339,
      average_comments: 2890,
      motivation: 41,
      content_emotion: +1,
      comment_emotion: -1
    }
  ],
  trends: [
    {
      id: 1,
      name: "مروارید",
      posts: 8240,
      accounts: 8240,
      likes: 4339,
      comments: 1455,
      initiators: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      influencers: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      content_emotion: -1,
      comment_emotion: 1,
      related_words: ["گرینلند", "پمپئو", "فلورانس", "تغییرات", "بیکاری"]
    },
    {
      id: 2,
      name: "خزر",
      posts: 8240,
      accounts: 8240,
      likes: 4339,
      comments: 1455,
      initiators: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      influencers: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      content_emotion: -1,
      comment_emotion: -1,
      related_words: ["گرینلند", "پمپئو", "فلورانس", "تغییرات", "بیکاری"]
    },
    {
      id: 3,
      name: "محمودیه",
      posts: 8240,
      accounts: 8240,
      likes: 4339,
      comments: 1455,
      initiators: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      influencers: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      content_emotion: 1,
      comment_emotion: 1,
      related_words: ["گرینلند", "پمپئو", "فلورانس", "تغییرات", "بیکاری"]
    },
    {
      id: 4,
      name: "پلیکان",
      posts: 8240,
      accounts: 8240,
      likes: 4339,
      comments: 1455,
      initiators: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      influencers: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      content_emotion: +1,
      comment_emotion: -1,
      related_words: ["گرینلند", "پمپئو", "فلورانس", "تغییرات", "بیکاری"]
    },
    {
      id: 5,
      name: "دریانورد",
      posts: 8240,
      accounts: 8240,
      likes: 4339,
      comments: 1455,
      initiators: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      influencers: [
        {
          id: 1,
          name: "مرتضی محمدی",
          username: "morteza"
        },
        {
          id: 2,
          name: "سارا مرادی",
          username: "moradi"
        },
        {
          id: 3,
          name: "سیروان",
          username: "sirone"
        }
      ],
      content_emotion: -1,
      comment_emotion: 1,
      related_words: ["گرینلند", "پمپئو", "فلورانس", "تغییرات", "بیکاری"]
    }
  ],
  accounts: [
    {
      id: 1,
      social_media: "twitter",
      name: "سیروان",
      username: "sirone",
      followers: 1998,
      followings: 134,
      posts: 7333
    },
    {
      id: 2,
      social_media: "instagram",
      name: "میلاد",
      username: "milad",
      followers: 1998,
      followings: 134,
      posts: 7333
    }
  ],
  projects: [
    {
      id: 1,
      name: "کاله",
      date: "12 خرداد 1398",
      time: "16:43",
      queries: [
        {
          id: 1,
          name: "ماست",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 2,
          name: "صبحانه",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 3,
          name: "سفر",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        }
      ],
      selectedQueries: [1]
    },
    {
      id: 2,
      name: "بازتاب",
      date: "12 خرداد 1398",
      time: "16:43",
      queries: [
        {
          id: 1,
          name: "ماست",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 2,
          name: "صبحانه",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 3,
          name: "سفر",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 4,
          name: "پیکنیک",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 5,
          name: "خبر",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        }
      ],
      selectedQueries: [1]
    },
    {
      id: 3,
      name: "مطالعه",
      date: "12 خرداد 1398",
      time: "16:43",
      queries: [
        {
          id: 1,
          name: "ماست",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 2,
          name: "صبحانه",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 3,
          name: "سفر",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 4,
          name: "کتاب",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 5,
          name: "انتشار",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        },
        {
          id: 6,
          name: "نویسنده",
          date: "12 خرداد 1398",
          time: "16:43",
          retrieved_posts: 682,
          active: 1
        }
      ],
      selectedQueries: [1]
    }
  ],
  myPosts: [
    {
      id: 1,
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان کردم و اهلیت و استحقاقش بگفتم تا به کاری مختصرش نصب کردن",
      date: "24 مهر 1398",
      time: "14:30",
      sent_network: [{network: "twitter"}, {network: "instagram"}],
      hashtags: [{tag: "گرینلند"}, {tag: "پمپئو"}, {tag: "فلورانس"}]
    },
    {
      id: 2,
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان کردم و اهلیت و استحقاقش بگفتم تا به کاری مختصرش نصب کردن",
      date: "24 مهر 1398",
      time: "14:30",
      sent_network: [{network: "twitter"}, {network: "instagram"}],
      hashtags: [{tag: "گرینلند"}, {tag: "پمپئو"}, {tag: "فلورانس"}]
    },
    {
      id: 3,
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان کردم و اهلیت و استحقاقش بگفتم تا به کاری مختصرش نصب کردن",
      date: "24 مهر 1398",
      time: "14:30",
      sent_network: [{network: "twitter"}, {network: "instagram"}],
      hashtags: [{tag: "گرینلند"}, {tag: "پمپئو"}, {tag: "فلورانس"}]
    }
  ],
  influencers: [
    {
      id: 1,
      name: "مرتضی محمدی",
      username: "morteza"
    },
    {
      id: 2,
      name: "سارا مرادی",
      username: "moradi"
    },
    {
      id: 3,
      name: "سیروان",
      username: "sirone"
    },
    {
      id: 4,
      name: "سالار",
      username: "salaria"
    },
    {
      id: 5,
      name: "بابک",
      username: "bobbluee"
    },
    {
      id: 6,
      name: "ملودی",
      username: "melooody"
    },
    {
      id: 7,
      name: "کامی",
      username: "kami"
    }
  ],
  keywords: [
    {
      text: "گرینلند",
      value: 1345
    },
    {
      text: "پمپئو",
      value: 922
    },
    {
      text: "فلورانس",
      value: 876
    },
    {
      text: "تغییر",
      value: 562
    },
    {
      text: "بیکاری",
      value: 561
    },
    {
      text: "آسایش",
      value: 428
    },
    {
      text: "آمریکا",
      value: 386
    },
    {
      text: "اقتصاد",
      value: 209
    },
    {
      text: "رشد",
      value: 87
    }
  ],
  words: [
    {
      text: "دونالد",
      value: 20
    },
    {
      text: "تحریم",
      value: 10
    },
    {
      text: "ظریف",
      value: 10
    },
    {
      text: "مردم",
      value: 13
    },
    {
      text: "آمریکا",
      value: 13
    },
    {
      text: "چین",
      value: 10
    },
    {
      text: "ایران",
      value: 8
    },
    {
      text: "تغییر",
      value: 13
    },
    {
      text: "خرید",
      value: 13
    },
    {
      text: "ما",
      value: 10
    },
    {
      text: "کاخ",
      value: 10
    },
    {
      text: "تعرفه",
      value: 10
    },
    {
      text: "جدید",
      value: 8
    },
    {
      text: "گفت",
      value: 10
    },
    {
      text: "رسانه",
      value: 10
    },
    {
      text: "گرینلند",
      value: 13
    }
  ],
  posts: [
    {
      id: 1,
      username: "morteza",
      name: "مرتضی محمدی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "negative",
      comment_emotion: "negative",
      sharable: 1,
      likes: 8240,
      comments: 4339,
      date: "1398/05/21",
      time: "16:42"
    },
    {
      id: 2,
      username: "moradi",
      name: "سارا مرادی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "neutral",
      comment_emotion: "negative",
      sharable: 1,
      likes: 240,
      comments: 39,
      date: "1398/05/21",
      time: "18:42"
    },
    {
      id: 3,
      username: "sirone",
      name: "سیروان",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "positive",
      comment_emotion: "positive",
      sharable: 1,
      likes: 82,
      comments: 43,
      date: "1398/05/20",
      time: "19:42"
    },
    {
      id: 4,
      username: "maryqueen",
      name: "مریم قاسم",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "positive",
      comment_emotion: "positive",
      sharable: 1,
      likes: 248,
      comments: 13,
      date: "1398/05/19",
      time: "20:42"
    },
    {
      id: 5,
      username: "vtalimar",
      name: "وحید علیمردی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "negative",
      comment_emotion: "positive",
      sharable: 1,
      likes: 120,
      comments: 19,
      date: "1398/05/19",
      time: "22:02"
    }
  ],
  latestQueries: [
    {
      id: 1,
      name: "ترامپ",
      username: "user1",
      created_at: "۵ ساعت پیش",
      date: new Date(2019, 1, 2)
    },
    {
      id: 2,
      name: "نیکزی",
      username: "user1",
      created_at: "۸ ساعت پیش",
      date: new Date(2018, 1, 2)
    },
    {
      id: 3,
      name: "کاله",
      username: "user1",
      created_at: "۱ روز پیش",
      date: new Date(2017, 1, 2)
    },
    {
      id: 4,
      name: "کافه لمیز",
      username: "user1",
      created_at: "۱ روز پیش",
      date: new Date(2016, 1, 2)
    },
    {
      id: 5,
      name: "۱۴۰۰",
      username: "user1",
      created_at: "۵ روز پیش",
      date: new Date(2015, 1, 2)
    },
    {
      id: 6,
      name: "نفتکش",
      username: "user1",
      created_at: "۸ روز پیش",
      date: new Date(2014, 1, 2)
    }
  ],
  lastQueryId: 6,
  selectedQuery: 1,
  selectedQueryMenu: null,
  auth
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {isAuthenticated: !state.isAuthenticated};
    case types.LOGIN_REQUEST:
      auth.authorize();
      break;
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        id_token: null,
        expires_at: null
      };
    case types.AUTHENTICATE_CHECKED:
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at
      };
    case types.TRIGGER_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    case types.ADD_QUERY:
      var now = new Date();
      var id = state.lastQueryId + 1;
      return {
        ...state,
        lastQueryId: id,
        latestQueries: [
          ...state.latestQueries,
          {
            id,
            name: action.data.name,
            username: action.data.username,
            created_at: "لحظاتی پیش",
            date: now
          }
        ]
      };
    case types.CHANGE_SELCETED_QUERY:
      return {
        ...state,
        selectedQuery: action.queryId
      };
    case types.SELECT_QUERY_MENU:
      return {
        ...state,
        selectedQuery: action.id,
        selectedQueryMenu: {
          id: action.id,
          name: action.name
        }
      };
    case types.CHANGE_SNACKBAR_STATUS:
      return {
        ...state,
        isSnackbarOpen: action.data.open,
        snackbarMessage: action.data.msg
      };
    case types.SELECT_QUERY_DASHBOARD_LIST_ITEM:
      return {
        ...state,
        selectedQueryDashboardItem: action.item
      };
    case types.SELECT_EMOTION:
      return {
        ...state,
        selectedEmotion: action.emotion
      };
    case types.SELECT_GROUP:
      return {
        ...state,
        selectedGroup: action.id
      };
    case types.SELECT_PAGE:
      history.push("/dashboard" + (action.page != "" ? "/" + action.page : ""));
      return {
        ...state,
        selectedPage: action.page
      };
    case types.SELECT_ANALYSIS_TYPE:
      return {
        ...state,
        selectedAnalysisType: action.t
      };
    case types.CHANGE_ANALYSIS_STATUS:
      return {
        ...state,
        analysis: state.analysis.map(el =>
          el.id == action.analysis ? {...el, active: !el.active} : el
        )
      };
    case types.SELECT_QUERIES_TYPE:
      return {
        ...state,
        selectedQueriesType: action.t
      };
    case types.CHANGE_QUERY_STATUS:
      return {
        ...state,
        queries: state.queries.map(el =>
          el.id == action.query ? {...el, active: !el.active} : el
        )
      };
    case types.SELECT_QUERY:
      var selectedQuery = {};
      state.queries.map(q => {
        if (q.id == action.id) {
          selectedQuery = q;
        }
      });
      return {
        ...state,
        selectedQuery,
        selectedQueryDashboardItem: "dashboard"
      };
    case types.SELECT_KEYWORD:
      return {
        ...state,
        selectedKeyword: action.word.text
      };
    case types.BACK_TO_QUERIES:
      return {
        ...state,
        selectedQuery: null,
        selectedQueryDashboardItem: null
      };
    case types.CANCEL_CREATE:
      return {
        ...state,
        selectedPage: action.page
      };
    case types.EDITABLE_QUERY:
      var editableQuery = {};
      state.queries.map(q => {
        if (q.id == action.id) {
          editableQuery = q;
        }
      });
      return {
        ...state,
        editableQuery
      };
    case types.EDITABLE_PROJECT:
      var editableProject = {};
      state.projects.map(p => {
        if (p.id == action.id) {
          editableProject = p;
        }
      });
      return {
        ...state,
        editableProject
      };
    case types.EDITABLE_TRAFFIC_ANALYSIS:
      var editableTrafficAnalysis = {};
      state.analysis.map(a => {
        if (a.id == action.id) {
          editableTrafficAnalysis = a;
        }
      });
      return {
        ...state,
        editableTrafficAnalysis
      };
    case types.GO_TO_ADD_QUERY:
      var addQuery = {
        id: null,
        name: "",
        active: 1,
        social: {
          twitter: 0,
          instagram: 0,
          instagramUsers: [],
          twitterUsers: []
        },
        retrieved_posts: 0,
        date: "12 خرداد 98",
        time: "16:43",
        selectedProject: null,
        isDaySelected: false,
        selectedDay: {
          from: null,
          to: null
        },
        location: {
          isLocationEnable: false,
          center: [51.4124, 35.7325]
        },
        keywords: [],
        hashtags: []
      };
      // console.log(addQuery);
      return {
        ...state,
        addQuery
      };
    case types.CHANGE_ADD_QUERY:
      // console.log(action.data);
      return {
        ...state,
        addQuery: action.data
      };
    case types.CREATE_QUERY:
      var last_id = state.queries[state.queries.length - 1].id;
      var addQuery = state.addQuery;
      addQuery.id = last_id + 1;
      return {
        ...state,
        queries: [...state.queries, addQuery]
      };
    case types.DELETE_QUERY:
      var removed_list = [];
      // console.log(action.query.id);
      state.queries.map((item, index) => {
        if (item.id != action.query.id) {
          removed_list.push(item);
        }
      });
      return {
        ...state,
        queries: removed_list
      };
    case types.CHANGE_EDITABLE_QUERY:
      // console.log(action.data);
      return {
        ...state,
        editableQuery: action.data
      };
    case types.EDIT_QUERY:
      // console.log(state.editableQuery);

      var editableQuery = state.editableQuery;
      var queries = state.queries;
      var new_queries = [];
      queries.map((item, index) => {
        if (item.id != editableQuery.id) {
          new_queries.push(item);
        } else {
          new_queries.push(editableQuery);
        }
      });
      return {
        ...state,
        queries: new_queries
      };
    /* *** */
    case types.GO_TO_ADD_TRAFFIC_ANALYSIS:
      var addTrafficAnalysis = {
        id: null,
        name: "",
        active: 1,
        date: "12 خرداد 98",
        time: "16:43",
        isDaySelected: false,
        selectedDay: {
          from: null,
          to: null
        },
        location: {
          isLocationEnable: false,
          center: [51.4124, 35.7325]
        }
      };
      // console.log(addTrafficAnalysis);
      return {
        ...state,
        addTrafficAnalysis
      };
    case types.CHANGE_ADD_TRAFFIC_ANALYSIS:
      // console.log(action.data);
      return {
        ...state,
        addTrafficAnalysis: action.data
      };
    case types.CREATE_TRAFFIC_ANALYSIS:
      var last_id = state.analysis[state.analysis.length - 1].id;
      var addTrafficAnalysis = state.addTrafficAnalysis;
      addTrafficAnalysis.id = last_id + 1;
      // console.log(addTrafficAnalysis);

      return {
        ...state,
        analysis: [...state.analysis, addTrafficAnalysis]
      };
    case types.DELETE_TRAFFIC_ANALYSIS:
      var removed_list = [];
      // console.log(action.query.id);
      state.analysis.map((item, index) => {
        if (item.id != action.analysis.id) {
          removed_list.push(item);
        }
      });
      return {
        ...state,
        analysis: removed_list
      };
    case types.CHANGE_EDITABLE_TRAFFIC_ANALYSIS:
      // console.log(action.data);
      return {
        ...state,
        editableTrafficAnalysis: action.data
      };
    case types.EDIT_TRAFFIC_ANALYSIS:
      // console.log(state.editableTrafficAnalysis);

      var editableTrafficAnalysis = state.editableTrafficAnalysis;
      var analysis = state.analysis;
      var new_analysis = [];
      analysis.map((item, index) => {
        if (item.id != editableTrafficAnalysis.id) {
          new_analysis.push(item);
        } else {
          new_analysis.push(editableTrafficAnalysis);
        }
      });
      return {
        ...state,
        analysis: new_analysis
      };
    /* *** */
    case types.GO_TO_ADD_PROJECT:
      var addProject = {
        id: null,
        name: "",
        date: "12 خرداد 1398",
        time: "16:43",
        queries: [],
        selectedQueries: []
      };
      return {
        ...state,
        addProject
      };
    case types.CHANGE_ADD_PROJECT:
      // console.log(action.data);
      return {
        ...state,
        addProject: action.data
      };
    case types.CREATE_PROJECT:
      var last_id = state.projects[state.projects.length - 1].id;
      var addProject = state.addProject;
      addProject.id = last_id + 1;
      // console.log(addProject);

      return {
        ...state,
        projects: [...state.projects, addProject]
      };
    case types.DELETE_PROJECT:
      var removed_list = [];
      // console.log(action.query.id);
      state.projects.map((item, index) => {
        if (item.id != action.project.id) {
          removed_list.push(item);
        }
      });
      return {
        ...state,
        projects: removed_list
      };
    case types.CHANGE_EDITABLE_PROJECT:
      // console.log(action.data);
      return {
        ...state,
        editableProject: action.data
      };
    case types.EDIT_PROJECT:
      // console.log(state.editableProject);

      var editableProject = state.editableProject;
      var projects = state.projects;
      var new_projects = [];
      projects.map((item, index) => {
        if (item.id != editableProject.id) {
          new_projects.push(item);
        } else {
          new_projects.push(editableProject);
        }
      });
      return {
        ...state,
        projects: new_projects
      };
    case types.CHANGE_BAG_ITEM_STATUS:
      var myBag = state.myBag;
      var newBag = [];
      myBag.map((item, index) => {
        if (action.item == item.name) {
          newBag.push({name: item.name, selected: !item.selected});
        } else {
          newBag.push(item);
        }
      });
      return {
        ...state,
        myBag: newBag
      };
    case types.CHECK_ALL_BAG_ITEM_STATUS:
      var myBag = state.myBag;
      var newBag = [];
      myBag.map((item, index) => {
        newBag.push({name: item.name, selected: action.status});
      });
      return {
        ...state,
        myBag: newBag
      };
    default:
      return state;
  }
};

export default rootReducer;
