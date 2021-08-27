export const initialData = {
  boards: [
    {
      id: "brd-1",
      columnOrder: ["cln-2", "cln-1"],
      columns: [
        {
          id: "cln-1",
          boardId: "brd-1",
          title: "Brain",
          cardOrder: ["card-1", "card-2"],
          cards: [
            {
              id: "card-1",
              boardId: "brd-1",
              columnId: "cln-1",
              title: "Epic react",
              cover:
                "https://miro.medium.com/max/1400/1*lmWVKjCKw6yqxKkAIKUMng.gif",
            },
            {
              id: "card-2",
              boardId: "brd-1",
              columnId: "cln-1",
              title: "Title of card 2",
              cover: null,
            },
          ],
        },
        {
          id: "cln-2",
          boardId: "brd-1",
          title: "Please talk about yourself!",
          cardOrder: [
            "card-3",

            "card-7",
            "card-4",
            "card-8",
            "card-5",
            "card-6",
          ],
          cards: [
            {
              id: "card-3",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Hi,my name's Quang Anh, please talk about yourself!",
              cover:
                "https://miro.medium.com/max/1400/1*lmWVKjCKw6yqxKkAIKUMng.gif",
            },
            {
              id: "card-4",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Title of card 4",
              cover: null,
            },
            {
              id: "card-5",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Title of card 5",
              cover: null,
            },
            {
              id: "card-6",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Title of card 6",
              cover: null,
            },
            {
              id: "card-7",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Title of card 7",
              cover: null,
            },
            {
              id: "card-8",
              boardId: "brd-1",
              columnId: "cln-2",
              title: "Title of card 8",
              cover: null,
            },
          ],
        },
      ],
    },
    {
      id: "brd-2",
      columnOrder: ["cln-3"],
      columns: [
        {
          id: "cln-3",
          boardId: "brd-2",
          title: "What do you think?",
          cardOrder: ["card-9", "card-10"],
          cards: [
            {
              id: "card-9",
              boardId: "brd-2",
              columnId: "cln-3",
              title: "Title of card 9",
              cover:
                "https://miro.medium.com/max/1400/1*lmWVKjCKw6yqxKkAIKUMng.gif",
            },
            {
              id: "card-10",
              boardId: "brd-2",
              columnId: "cln-3",
              title: "Title of card 10",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
