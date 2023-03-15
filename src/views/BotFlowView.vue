<script>
  export default {
    data() {
      return {
        botFlow: null,
        messageKey: null,
        checkedRadioMessage: 'text',
      }
    },
    methods: {
      getCurrentTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
      },
      getBotFlowData() {
        // get bot flow (json) to load the template
        axios.get('http://localhost:8000/api/bot-flow').then(response => {
            this.botFlow = response.data.bot_flow;
          }).catch(error => {
            console.log(error);
            return 'get-bot-flow-error';
          });
      },
      getStartOnClick() {
        $('.get-start-div').hide();
        $('.bot-control-empty-column').hide();
        $('.save-btn').show();
        $('.bot-message-control').show();
        $('.bot-control-column').show();
      },
      removeText() {
        // 
      },
      removePhoto() {

      },
      removeAnimation() {
        // 
      }
    },
    created() {

      const app = this;

      $(document).ready(function() {

          $('.save-btn').hide();
          $('.bot-control-column').hide();
          $('.bot-message-control').hide();

          // app.messageBoxHeight = 617;
          app.buttonDivHeight = $('.button-div').height();

          app.getBotFlowData();

      });
    },
    watch: {
      checkedRadioMessage() {

        if (this.checkedRadioMessage == 'text') {

          if (!this.botFlow.data[this.messageKey]) {
            $('.text-message-row').show();
            return;
          }

          this.removePhoto();
          this.removeAnimation();
          if (!this.textMessage) {
            this.textMessage = "Text Message";
          }
          $('.text-message-row').show();

        } else if (this.checkedRadioMessage == 'image') {
            if ('text' in this.botFlow.data[this.messageKey]) {
              this.removeText();
            } else if ('animation' in this.botFlow.data[this.messageKey]) {
              this.removeAnimation();
            }
            if (!this.photoMessage) {
              this.photoMessage = "{{ asset('img/robot1.jpg') }}";
            }
            $('.photo-message-row').show();
        } else if (this.checkedRadioMessage == 'gif') {
          if ('text' in this.botFlow.data[this.messageKey]) {
            this.removeText();
          } else if ('photo' in this.botFlow.data[this.messageKey]) {
            this.removePhoto();
          }
          if (!this.animationMessage) {
            this.animationMessage = "{{ asset('img/mikasa.gif') }}";
          }
          $('.animation-message-row').show();
        }

      },
    }
  }
</script>

<template>
  <div class="row">
    <div class="col-lg-8 col-md-6 col-sm-12 p-1 bot-control-empty-column"></div>
    <!-- Control -->
    <div class="col-lg-8 col-md-6 col-sm-12 p-1 bot-control-column">

      <div class="card shadow bot-template-control-card mb-4">
        <div class="card-body">
          <div class="control-group">
            <div class="row justify-content-center">
              <div class="col-xl-7">
                <span>Message Types</span>
                <div class="row mt-2">
                  <div class="col-lg-4">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="radio" class="form-check-input cb-text" value="text" v-model="checkedRadioMessage">Text
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="radio" class="form-check-input cb-image" value="image" v-model="checkedRadioMessage">Image
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="radio" class="form-check-input cb-gif" value="gif" v-model="checkedRadioMessage">Gif
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-5">
                <span>Keyboards</span>
                <div class="row mt-2">
                  <div class="col-lg-6">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input cb-button" value="button" v-model="checkedButton">Button
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input cb-slide" value="slide" v-model="checkedSlide">Slide
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Detail -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <div v-if="textMessage !== null" class="form-group message-text-form-group">
            <label for="text-bot-message">Reply Text:</label>
            <input type="text" class="form-control text-bot-message" placeholder="Text Message" id="text-bot-message" v-model="textMessage">
          </div>
          <div v-if="photoMessage !== null" class="form-group message-text-form-group">
            <label for="text-bot-message">Photo:</label>
            <input type="text" class="form-control text-bot-message" placeholder="Caption For Image" id="text-bot-message" v-model="captionMessage">
            <div class="custom-file mt-2">
              <input type="file" class="custom-file-input" id="photoFile" @change="photoOnChange">
              <label class="custom-file-label" for="photoFile">Choose file</label>
            </div>
          </div>
          <div v-if="animationMessage !== null" class="form-group message-text-form-group">
            <label for="text-bot-message">Gif:</label>
            <input type="text" class="form-control text-bot-message" placeholder="Caption For Gif" id="text-bot-message" v-model="captionMessage">
            <div class="custom-file mt-2">
              <input type="file" class="custom-file-input" id="animationFile" @change="animationOnChange">
              <label class="custom-file-label" for="animationFile">Choose file</label>
            </div>
          </div>
          <!-- <div v-if="buttonMessage != null" class="form-group message-text-form-group">
            <div class="button-title-div">
              <label>Buttons:</label>
              <div class="btn-group float-right">
                <button class="btn btn-outline-primary add-new-row" @click="removeButtonRowBtnOnClick()">Remove Row</button>
                <button class="btn btn-primary add-new-row" @click="addButtonRowBtnOnClick()">Add Row</button>
              </div>
            </div>
            <div v-for="buttons in buttonMessage" class="row mb-2" style="background: #f5f5f5; padding-top: 10px; padding-bottom: 10px; border-radius: 5px;">
              <div v-for="button in buttons" class="mt-2 mb-4" :class="[ buttons.length>0 ? 'col-xl-'+(parseInt(12/buttons.length)): '' ]">
                <input type="text" class="form-control text-bot-message" placeholder="Button" id="text-bot-message" v-model="button['text']">
                <select class="form-control mt-1" v-if="buttonSelected !== null" @change="btnSelectOnChange($event, buttonMessage.indexOf(buttons), buttons.indexOf(button))">
                  <option :selected="buttonSelected[buttonMessage.indexOf(buttons)][buttons.indexOf(button)] == 'Reply'? 'selected': null">Reply</option>
                  <option :selected="buttonSelected[buttonMessage.indexOf(buttons)][buttons.indexOf(button)] == 'URL'? 'selected': null">URL</option>
                </select>
                <input v-if="'url' in button" type="text" class="form-control text-bot-message mt-1" placeholder="Button" id="text-bot-message" v-model="button['url']">
              </div>
              <div class="btn-group mb-2" style="margin-left: 0.75rem">
                <button class="btn btn-outline-primary add-new-column" @click="removeButtonColumnBtnOnClick(buttons)">-</button>
                <button class="btn btn-primary add-new-column" @click="addButtonColumnBtnOnClick(buttons)">+</button>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div class="card shadow">
        <div class="card-body">
            <textarea name="jsondata" id="" cols="30" rows="15" class="form-control" disabled>{{ botFlow }}</textarea>
        </div>
      </div>
      
    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 p-1">
      <div class="card bot-flow-display">
        <div class="card-body p-0">
          <div class="bot-display-noti-bar">
            <span class="mobile-time ml-2">{{ getCurrentTime() }}</span>
            <span class="mobile-time text-gray-200"> | </span>
            <span class="mobile-time text-gray-200">Bot Template</span>
            <i class="mobile-time text-gray-200 fas fa-battery-half float-right mx-1"></i>
            <i class="mobile-time text-gray-200 fas fa-wifi float-right mx-1"></i>
            <i class="mobile-time text-gray-200 fas fa-signal float-right mx-1"></i>
          </div>
          <div class="bot-display-header">
            <img src = "@/assets/img/logo.png" alt="bot logo" class="bot-display-header-logo m-1">
            <div class="bot-display-header-title m-1">
              <span style="font-size: 14px;">Saya Institude</span><br>
              <span style="font-size: 10px; color: gray;">Education</span>
            </div>
            <i class="fas fa-save text-gray-200 mr-3 save-btn m-1"></i>
          </div>
          <div class="bot-message-body">
            <!-- message body -->
            <div class="message-div-row">
              <div class="message-div bot-msg-div">
                  <p class="message m-0">How can I help you?</p>
              </div>
            </div>
            <div class="message-div-row">
              <div class="message-div bot-user-msg-div">
                  <p class="message m-0">Hello</p>
              </div>
            </div>
            <div class="message-div-row photo-message-row">
              <div class="message-div bot-msg-div">
                <img class="photo-message" src = "@/assets/img/starrynight.jpg" />
              </div>
            </div>
            <div class="message-div-row animation-message-row">
              <div class="message-div bot-msg-div">
                <img class="photo-message" src = "@/assets/img/baifern.gif" />
              </div>
            </div>
          </div>
          <div class="bot-message-control p-1">
            <textarea name="message_input_box" cols="30" rows="1" class="form-control message-input-box" placeholder="Message"></textarea>
          </div>
          <div class="get-start-div p-1 text-center m-2">
            <button @click="getStartOnClick()" class="btn get-started">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>