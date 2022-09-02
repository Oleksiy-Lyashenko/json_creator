import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [formatText, setFormatText] = useState([]);

  const handleButton = (sometext) => {
    if (text === '') {
      return alert('Fild form please!');
    }

    let arr;

    if (typeof sometext === 'string') {
      arr = sometext.split('\n');
    } else {
      arr = sometext;
    }

    const format = arr.map((val, i) => {
      const obj = {
        id: Math.random().toString(16).slice(2),
        val: val,
      };

      if (val.includes('{')) {
        let childArr = arr.slice(i + 1);
        const indexOfEnd = childArr.indexOf('}');
        childArr = childArr.slice(0, indexOfEnd);

        obj.child = [];
        obj.val = val.slice(0, val.indexOf(' '));
      }

      return obj;
    });

    setFormatText(changeText(format));
  };

  const changeText = (format) => {
    let result = `[\na]`;

    const arrObj = format.map((val, i) => {
      let obj = ` {\n  "id": "${val.id}",\n  "val": "${val.val}"\n },\n`;

      if (i === format.length - 1) {
        return obj.slice(0, obj.length - 2) + `\n`;
      }

      return obj;
    });

    return result.replace('a', arrObj.join(''));
  };

  const deleteText = () => {
    setText('');
    setFormatText([]);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="block">
          <h1 className="title">JSON Creator</h1>
          <textarea
            className="textarea"
            name=""
            id=""
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="buttons">
            <button className="button" onClick={() => handleButton(text)}>
              Transform
            </button>
            {formatText.length > 0 && (
              <button className="button button--delete" onClick={deleteText}>
                Delete
              </button>
            )}
          </div>

          <textarea
            className="textarea textarea--output"
            name=""
            id=""
            cols="30"
            rows="10"
            value={formatText}
          />

          <p>It's simple creator, which create objects in array. Object has two key: id, val</p>
        </div>
      </div>
    </div>
  );
}

export default App;
