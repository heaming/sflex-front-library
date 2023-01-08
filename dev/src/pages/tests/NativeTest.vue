<template>
  <kw-page>
    <div class="result-area">
      <kw-form :label-size="300">
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.getNetworkStatus"
            @click="request('getNetworkStatus')"
          />
        </kw-form-row>

        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.getDeviceVersion"
            @click="request('getDeviceVersion')"
          />
        </kw-form-row>

        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.getDeviceId"
            @click="request('getDeviceId')"
          />
        </kw-form-row>

        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.getDeviceToken"
            @click="request('getDeviceToken')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.openCamera"
            @click="request('openCamera')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.openPhotoGallery"
            @click="request('openPhotoGallery')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.setPreference('text', 'test preference')"
            @click="request('setPreference', 'text', 'test preference')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.getPreference('text')"
            @click="request('getPreference', 'text')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.openPhone('010-1234-5678')"
            @click="request('openPhone', '010-1234-5678')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.openSMS('010-1234-5678', 'test sms')"
            @click="request('openSMS', '010-1234-5678', 'test sms')"
          />
        </kw-form-row>
        <kw-form-row>
          <kw-btn
            class="row"
            label="mobileUtil.openPrint('aa', 'bb')"
            @click="request('openPrint', 'aa', 'bb')"
          />
        </kw-form-row>
        <kw-form-row>
          <div class="row">
            <kw-input
              v-model="routeInfo"
              class="w500"
              type="textarea"
              rows="11"
            />
            <kw-btn
              label="mobileUtil.openTMap"
              @click="request('openTMap', JSON.parse(routeInfo))"
            />
          </div>
        </kw-form-row>
      </kw-form>
    </div>
  </kw-page>
</template>

<script setup>
import { alert, mobileUtil } from '~kw-lib';

async function request(method, ...params) {
  alert(await mobileUtil[method](...params));
}

const routeInfo = JSON.stringify({
  rGoName: '강남역',
  rGoX: 127.027621,
  rGoY: 37.497942,
  rStName: '서울역',
  rStX: 126.972646,
  rStY: 37.553017,
  rV1Name: '용산역',
  rV1X: 126.964775,
  rV1Y: 37.52989,
}, null, '\t');

</script>
