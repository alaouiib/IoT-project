<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title ">
          Transfer Learning - Image Classifier
        </h1>
        <h2 class="subtitle predictedLabel">
          predicted label: <b style="color: red">"{{ predictedLabel }}"</b>
        </h2>
        <video id="video" autoplay></video>
        <div class="columns">
          <div class="container">
            <div class="has-text-centered">
              <div class="column ">
                Train:
                <button
                  class="button  is-outlined"
                  @mousedown="addImage('othmane')"
                >
                  othmane
                </button>
                <button class="button  is-outlined" @mousedown="addImage('abdel')">
                  abdel
                </button>
              </div>

              <div class="column ">
                <button class="button is-black is-outlined" @click="train">
                  Train
                </button>
              </div>
              <div class="column">
                <button class="button   is-danger is-outlined" @click="guess">
                  Classify video
                </button>
              </div>
              <div class="column">
                <button
                  class="button   is-danger is-outlined"
                  @click="exportModel"
                >
                  Export model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ml5 from "ml5";
export default {
  data() {
    return {
      modelLoadedMsg: "",
      videoReadyMsg: "",
      classifier: null,
      predictedLabel: " "
    };
  },
  methods: {
    async modelLoaded() {
      this.modelLoadedMsg = "modelLoaded";
      this.$buefy.snackbar.open({
        message: "The Model has been Loaded !",
        type: "is-primary",
        position: "is-top",
        actionText: "Ok",
        indefinite: false
      });
    },
    videoReady() {
      this.videoReadyMsg = "video ready";
        
        this.classifier.load("./model.json", () => {
          console.log("loaded !");
        //   this.classifier.classify((err, res) => {
        //     console.log(res);
        //   });
        });
    },
    predict() {
      this.classifier.predict(this.gotResults);
    },
    gotResults(err, results) {
      if (err) console.error(err);
      //   console.log(results[0].label);
      this.predictedLabel = results[0].label;
      this.guess();
    },
    async addImage(label) {
      await this.classifier.addImage(label);
      console.log("image added", label);
    },
    train(lossValue) {
      this.classifier.train(function(lossValue) {
        if (lossValue) {
          console.log("loss value:", lossValue);
        } else {
           alert('c est bon !')
          console.log('Train finished !');
        }
      });
    },
    guess() {
      this.classifier.classify(this.gotResults);
    },
    exportModel() {
      this.classifier.save();
    },
  
   
    
  },
  created() {},
  mounted() {
    // Create a webcam capture
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream;
      video.play();

      const featureExtractor = ml5.featureExtractor(
        "MobileNet",
        {
          epochs: 100
        },
        this.modelLoaded
      );
      // Create a new classifier using those features
      this.classifier = featureExtractor.classification(
        video,
        this.videoReady
      );
    //   this.classifier = classifier;
      
    });
  }
};
</script>

<style>
div video {
  width: 640px;
  height: 480px;
  display: block;
  margin: 10px auto;
}
h1.title {
  margin: 0 auto;
  width: 940px;
  margin-left: 25%;
}
h2.predictedLabel {
  display: inline-block;
  width: 500px;
  margin: 0 auto;
  border: cornflowerblue dotted 1px;
  border-radius: 4px;
  margin-left: 25%;
}
body {
  background: #f4f4f4;
}
</style>
