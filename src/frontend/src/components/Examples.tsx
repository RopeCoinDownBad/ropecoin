export default function Examples() {
  return (
    <div>
      <hr style={{ clear: "both" }} />

      <div id="examples">
        <h1 style={{ fontSize: "150%" }}>Examples</h1>
        <p>
          Below are examples of key elements. Scroll down or choose from the
          list to view an example:
        </p>
        <ul>
          <li>
            <a href="#containers">Containers</a>
          </li>
          <li>
            <a href="#paragraphs">Paragraphs &amp; Text Input</a>
          </li>
          <li>
            <a href="#buttons">Buttons</a>
          </li>
          <li>
            <a href="#radio-and-check">Radio &amp; Checkbox</a>
          </li>
          <li>
            <a href="#drop-and-list">Dropdown &amp; Lists</a>
          </li>
          <li>
            <a href="#icons">Icons</a>
          </li>
          <li>
            <a href="#sliders">Sliders</a>
          </li>
          <li>
            <a href="#progress">Progress bar</a>
          </li>
          <li>
            <a href="#disabled">Disabled Elements</a>
          </li>
          <li>
            <a href="#cursors">Cursors</a>
          </li>
        </ul>

        <div
          id="containers"
          className="container framed-grey"
          style={{ width: "100%", height: "100%" }}
        >
          <h1>Containers</h1>
          <p>
            This example shows the built-in containers and frames. Containers
            are just fancy divs used for elements.
          </p>
          <hr />

          <div
            className="container framed"
            style={{
              position: "relative",
              width: "32%",
              height: "300px",
              display: "inline-block",
            }}
          >
            <p>
              class:
              <br />
              container framed
            </p>
          </div>

          <div
            className="container framed-golden"
            style={{
              position: "relative",
              width: "32%",
              height: "300px",
              display: "inline-block",
            }}
          >
            <p>
              class:
              <br />
              container framed-golden
            </p>
          </div>

          <div
            className="container framed-golden-2"
            style={{
              position: "relative",
              width: "32%",
              height: "300px",
              display: "inline-block",
            }}
          >
            <p>
              class:
              <br />
              container framed-golden-2
            </p>
          </div>

          <br />
          <br />
          <div
            className="container framed-grey"
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
              display: "inline-block",
            }}
          >
            <p>
              class:
              <br />
              container framed-grey
            </p>
          </div>
        </div>

        <div id="paragraphs" className="container framed-grey">
          <h1>Paragraphs &amp; Text Input</h1>
          <p>This example shows the basic paragraphs and headers.</p>
          <hr />
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>

          <p>Regular paragraph (p)</p>
          <span>Span</span>
          <label>Label</label>
          <a>Link (a)</a>
          <br />
          <br />
          <label>Text input:</label>
          <input placeholder="first name" />

          <br />
          <br />
          <label>Textarea:</label>
          <textarea
            placeholder="write your story here..."
            spellCheck="false"
          ></textarea>
        </div>

        <div id="buttons" className="container framed-grey">
          <h1>Buttons</h1>
          <p>This example shows the basic buttons.</p>
          <hr />
          <div className="center" style={{ float: "left", width: "49%" }}>
            <button type="button" className="button">
              <p>Regular button</p>
            </button>
            <button type="button" className="button down">
              <p>Button pressed</p>
            </button>
            <button type="button" className="button hover">
              <p>Button hover</p>
            </button>
          </div>
          <div className="center" style={{ float: "right", width: "49%" }}>
            <button type="button" className="button golden">
              <p>Golden button</p>
            </button>
            <button type="button" className="button golden down">
              <p>Golden down</p>
            </button>
            <button type="button" className="button golden hover">
              <p>Golden hover</p>
            </button>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

        <div id="radio-and-check" className="container framed-grey">
          <h1>Radio and Check boxes</h1>
          <p>This example shows radio buttons and check boxes.</p>
          <hr />

          <div style={{ float: "left", width: "24.5%" }}>
            <input className="checkbox" type="checkbox" data-type="checkbox" />
            <label>Checkbox 1.</label>
            <input className="checkbox" type="checkbox" data-type="checkbox" />
            <label>Checkbox 2.</label>
            <input className="checkbox" type="checkbox" data-type="checkbox" />
            <label>Checkbox 3.</label>
          </div>
          <div style={{ float: "left", width: "24.5%" }}>
            <input
              className="checkbox golden"
              type="checkbox"
              data-type="checkbox"
            />
            <label>Checkbox 1.</label>
            <input
              className="checkbox golden"
              type="checkbox"
              data-type="checkbox"
            />
            <label>Checkbox 2.</label>
            <input
              className="checkbox golden"
              type="checkbox"
              data-type="checkbox"
            />
            <label>Checkbox 3.</label>
          </div>
          <div style={{ float: "left", width: "24.5%" }}>
            <input
              className="radio"
              name="radio"
              value="1"
              type="radio"
              data-type="radio"
            />
            <label>Radio 1</label>
            <input
              className="radio"
              name="radio"
              value="2"
              type="radio"
              data-type="radio"
            />
            <label>Radio 2</label>
            <input
              className="radio"
              name="radio"
              value="3"
              type="radio"
              data-type="radio"
            />
            <label>Radio 3</label>
          </div>
          <div style={{ float: "left", width: "24.5%" }}>
            <input
              className="radio golden"
              name="radio-golden"
              value="1"
              type="radio"
              data-type="radio"
            />
            <label>Radio 1</label>
            <input
              className="radio golden"
              name="radio-golden"
              value="2"
              type="radio"
              data-type="radio"
            />
            <label>Radio 2</label>
            <input
              className="radio golden"
              name="radio-golden"
              value="3"
              type="radio"
              data-type="radio"
            />
            <label>Radio 3</label>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

        <div id="drop-and-list" className="container framed-grey">
          <h1>Dropdown &amp; Lists</h1>
          <p>
            This example shows the dropdown (aka combobox) and the list widgets.
          </p>
          <hr />
          <div style={{ float: "left", width: "40%" }}>
            <p>Dropdown:</p>
            <select
              className="dropdown"
              data-type="dropdown"
              style={{ display: "none" }}
            >
              <option value="Warrior">Warrior</option>
              <option value="Mage">Mage</option>
              <option value="Rogue">Rogue</option>
              <option value="Ranger">Ranger</option>
            </select>
            <p className="dropdown-imp dropdown-imp-header">
              <label>▼</label> Warrior
            </p>
            <ul
              className="dropdown-imp"
              style={{
                position: "absolute",
                width: "309.188px",
                display: "none",
              }}
            >
              <li>Warrior</li>
              <li>Mage</li>
              <li>Rogue</li>
              <li>Ranger</li>
            </ul>
          </div>
          <div style={{ float: "right", width: "40%" }}>
            <p>List:</p>
            <select
              className="list"
              id="background-select"
              size={5}
              data-type="list"
              style={{ display: "none" }}
            >
              <option value="Blacksmith">Blacksmith</option>
              <option value="Merchant">Merchant</option>
              <option value="City Guard">City Guard</option>
              <option value="Alchemist">Alchemist</option>
              <option value="Explorer">Explorer</option>
              <option value="Thug">Thug</option>
              <option value="Mercenary">Mercenary</option>
              <option value="Royalty">Royalty</option>
              <option value="Gladiator">Gladiator</option>
            </select>
            <ul
              id="background-select-list"
              className="list-imp"
              style={{ height: "140px" }}
            >
              <li data-value="Blacksmith" className="">
                Blacksmith
              </li>
              <li data-value="Merchant" className="">
                Merchant
              </li>
              <li data-value="City Guard" className="">
                City Guard
              </li>
              <li data-value="Alchemist" className="">
                Alchemist
              </li>
              <li data-value="Explorer" className="">
                Explorer
              </li>
              <li data-value="Thug" className="">
                Thug
              </li>
              <li data-value="Mercenary" className="">
                Mercenary
              </li>
              <li data-value="Royalty" className="">
                Royalty
              </li>
              <li data-value="Gladiator" className="">
                Gladiator
              </li>
            </ul>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

        <div id="icons" className="container center framed-grey">
          <h1>Icons</h1>
          <p>
            This example shows the built-in icons. These can be easily extended.
          </p>
          <hr />

          <div className="icon sword"></div>
          <div className="icon shield"></div>
          <div className="icon exclamation"></div>
          <br />
          <br />

          <div className="icon potion-red"></div>
          <div className="icon potion-green"></div>
          <div className="icon potion-blue"></div>
          <br />
          <br />

          <div className="icon weapon-slot"></div>
          <div className="icon shield-slot"></div>
          <div className="icon armor-slot"></div>
          <br />
          <br />

          <div className="icon helmet-slot"></div>
          <div className="icon ring-slot"></div>
          <div className="icon potion-slot"></div>
          <br />
          <br />

          <div className="icon magic-slot"></div>
          <div className="icon shoes-slot"></div>
          <div className="icon empty-slot"></div>
        </div>

        <div id="sliders" className="container center framed-grey">
          <h1>Sliders</h1>
          <p>
            This example shows the sliders class, which replaces the "range"
            input element.
          </p>
          <hr />

          <div style={{ width: "60%", marginLeft: "20%" }}>
            <label>Slider:</label>
            <input
              className="slider"
              type="range"
              min="0"
              max="10"
              value="5"
              style={{ width: "100%", display: "none" }}
              data-type="slider"
            />
            <div className="slider-container" style={{ width: "485px" }}>
              <div className="slider-track"></div>
              <div className="slider-left-edge"></div>
              <div className="slider-right-edge"></div>
              <div className="slider-thumb" style={{ left: "232.5px" }}></div>
            </div>
            <br />
            <br />
            <label>Golden slider:</label>
            <input
              className="slider golden"
              type="range"
              min="0"
              max="10"
              value="5"
              style={{ width: "100%", display: "none" }}
              data-type="slider"
            />
            <div className="slider-container golden" style={{ width: "485px" }}>
              <div className="slider-track golden"></div>
              <div className="slider-left-edge golden"></div>
              <div className="slider-right-edge golden"></div>
              <div
                className="slider-thumb golden"
                style={{ left: "227.5px" }}
              ></div>
            </div>
          </div>
        </div>

        <div id="progress" className="container framed-grey">
          <h1>Progress Bars</h1>
          <p>This example shows the progress bar class.</p>
          <hr />

          <div style={{ width: "40%", marginLeft: "30%" }}>
            <label>Health:</label>
            <div
              id="hp-bar"
              data-value={0.4}
              className="progress red"
              data-type="progress"
            >
              <div className="progress-track">
                <div
                  className="progress-fill red"
                  style={{ left: "0px", width: "40%" }}
                ></div>
              </div>
              <div className="progress-left-edge"></div>
              <div className="progress-right-edge"></div>
            </div>
            <label>Mana:</label>
            <div
              id="mana-bar"
              data-value={0.8}
              className="progress blue"
              data-type="progress"
            >
              <div className="progress-track">
                <div
                  className="progress-fill blue"
                  style={{ left: "0px", width: "80%" }}
                ></div>
              </div>
              <div className="progress-left-edge"></div>
              <div className="progress-right-edge"></div>
            </div>
            <label>Stamina:</label>
            <div
              id="stamina-bar"
              data-value={0.2}
              className="progress green"
              data-type="progress"
            >
              <div className="progress-track">
                <div
                  className="progress-fill green"
                  style={{ left: "0px", width: "20%" }}
                ></div>
              </div>
              <div className="progress-left-edge"></div>
              <div className="progress-right-edge"></div>
            </div>
            <label>Experience:</label>
            <div
              id="stamina-bar"
              data-value="0.5"
              className="progress"
              data-type="progress"
            >
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ left: "0px", width: "50%" }}
                ></div>
              </div>
              <div className="progress-left-edge"></div>
              <div className="progress-right-edge"></div>
            </div>
          </div>
        </div>

        <div id="disabled" className="container framed-grey">
          <h1>Disabled Elements</h1>
          <p>
            All elements can be disabled using the "disable" attribute. Here's
            an example of disabled elements.
          </p>
          <hr />

          <div style={{ width: "42%", float: "left" }}>
            <h1>Text Input</h1>

            <label>Your hero name:</label>
            <input
              type="text"
              name="FirstName"
              value="Bob"
              placeholder="Hero name"
            />
            <br />
            <br />

            <label>Your hero last name:</label>
            <input
              type="text"
              name="FirstName"
              value="The Destroyer"
              placeholder="Hero last name"
            />
            <br />
            <br />

            <label>Your hero bio:</label>
            <textarea rows={3} cols={50}>
              Bob The Destroyer likes to destroy stuff.
            </textarea>

            <h1>Sliders:</h1>
            <input
              className="slider"
              type="range"
              min="0"
              max="10"
              value="8"
              style={{ width: "100%", display: "none" }}
              data-type="slider"
            />
            <div className="slider-container" style={{ width: "339px" }}>
              <div className="slider-track"></div>
              <div className="slider-left-edge"></div>
              <div className="slider-right-edge"></div>
              <div className="slider-thumb" style={{ left: "249.2px" }}></div>
            </div>
            <p>Golden slider:</p>
            <input
              className="slider golden"
              type="range"
              min="1"
              max="5"
              value="3"
              style={{ width: "100%", display: "none" }}
              data-type="slider"
            />
            <div className="slider-container golden" style={{ width: "339px" }}>
              <div className="slider-track golden"></div>
              <div className="slider-left-edge golden"></div>
              <div className="slider-right-edge golden"></div>
              <div
                className="slider-thumb golden"
                style={{ left: "154.5px" }}
              ></div>
            </div>

            <h1>Icons</h1>
            <div className="center">
              <div className="icon disabled sword"></div>
              <div className="icon disabled shield"></div>
              <div className="icon disabled exclamation"></div>
              <br />
              <br />

              <div className="icon disabled potion-red"></div>
              <div className="icon disabled potion-green"></div>
              <div className="icon disabled potion-blue"></div>
              <br />
              <br />

              <div className="icon disabled weapon-slot"></div>
              <div className="icon disabled shield-slot"></div>
              <div className="icon disabled armor-slot"></div>
              <br />
              <br />

              <div className="icon disabled helmet-slot"></div>
              <div className="icon disabled ring-slot"></div>
              <div className="icon disabled potion-slot"></div>
              <br />
              <br />

              <div className="icon disabled magic-slot"></div>
              <div className="icon disabled shoes-slot"></div>
              <div className="icon disabled empty-slot"></div>
              <br />
              <br />
            </div>
          </div>

          <div style={{ width: "42%", float: "right" }}>
            <h1>Buttons</h1>

            <button className="button" type="button" style={{ width: "100%" }}>
              <p>Button</p>
            </button>
            <br />
            <br />
            <button
              className="button golden"
              type="button"
              style={{ width: "100%" }}
            >
              <p>Gold Button</p>
            </button>
            <br />
            <br />

            <h1>Radio/Check</h1>
            <br />
            <div>
              <input
                className="radio"
                type="radio"
                name="sex"
                value="male"
                data-type="radio"
              />
              <label>Male</label>
              <br />
              <input
                className="radio"
                type="radio"
                name="sex"
                value="female"
                data-type="radio"
              />
              <label>Female</label>
              <br />
            </div>
            <div>
              <input
                className="radio golden"
                type="radio"
                name="sex2"
                value="male"
                data-type="radio"
              />
              <label>Male</label>
              <br />
              <input
                className="radio golden"
                type="radio"
                name="sex2"
                value="female"
                data-type="radio"
              />
              <label>Female</label>
              <br />
            </div>
            <br />

            <input className="checkbox" type="checkbox" data-type="checkbox" />
            <label>Checkbox 1.</label>
            <br />
            <input className="checkbox" type="checkbox" data-type="checkbox" />
            <label>Checkbox 2.</label>

            <h1>Dropdown</h1>
            <select
              className="dropdown"
              data-type="dropdown"
              style={{ display: "none" }}
            >
              <option value="Warrior">Warrior</option>
              <option value="Mage">Mage</option>
              <option value="Rogue">Rogue</option>
              <option value="Ranger">Ranger</option>
            </select>
            <p className="dropdown-imp dropdown-imp-header">
              <label>▼</label> Warrior
            </p>
            <ul
              className="dropdown-imp"
              style={{
                position: "absolute",
                width: "325.359px",
                display: "none",
              }}
            >
              <li>Warrior</li>
              <li>Mage</li>
              <li>Rogue</li>
              <li>Ranger</li>
            </ul>

            <br />
            <h1>List:</h1>
            <select
              className="list"
              id="background-select"
              size={4}
              data-type="list"
              style={{ display: "none" }}
            >
              <option value="1">Blacksmith</option>
              <option value="2">Merchant</option>
              <option value="3 Guard">City Guard</option>
              <option value="4">Alchemist</option>
            </select>
            <ul
              id="background-select-list"
              className="list-imp"
              style={{ height: "112px" }}
            >
              <li data-value="1" className="">
                Blacksmith
              </li>
              <li data-value="2" className="">
                Merchant
              </li>
              <li data-value="3 Guard" className="">
                City Guard
              </li>
              <li data-value="4" className="">
                Alchemist
              </li>
            </ul>

            <h1>Progress bar:</h1>
            <div
              id="hp-bar"
              data-value="0.4"
              className="progress disabled red"
              data-type="progress"
            >
              <div className="progress-track">
                <div
                  className="progress-fill red"
                  style={{ left: "0px", width: "40%" }}
                ></div>
              </div>
              <div className="progress-left-edge"></div>
              <div className="progress-right-edge"></div>
            </div>
          </div>

          <div style={{ clear: "both" }}></div>
        </div>

        <div id="cursors" className="container framed-grey center">
          <h1>Cursors</h1>
          <p>This example shows the basic cursors.</p>
          <hr />
          <button
            type="button"
            className="button cursor-default"
            style={{ width: "30%" }}
          >
            <p>Default</p>
          </button>
          <button
            type="button"
            className="button cursor-point"
            style={{ width: "30%" }}
          >
            <p>Pointer</p>
          </button>
          <button
            type="button"
            className="button cursor-select"
            style={{ width: "30%" }}
          >
            <p>Text Select</p>
          </button>
          <button
            type="button"
            className="button cursor-grab-open"
            style={{ width: "30%" }}
          >
            <p>Grab Open</p>
          </button>
          <button
            type="button"
            className="button cursor-grab-close"
            style={{ width: "30%" }}
          >
            <p>Grab Close</p>
          </button>
        </div>

        <br />
        <br />
        <br />
        <br />
        <div className="center">
          <h1 style={{ fontSize: "150%" }}>That's it, for now!</h1>
          <br />
          <br />
          <a href="#main">- Back to Top -</a>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
