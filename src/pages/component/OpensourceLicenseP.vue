<!-- eslint-disable max-len -->
<template>
  <kw-popup
    title="Open Source Software"
    size="full"
  >
    <div class="pa20">
      <p>
        The following sets forth attribution notices for third party software that may be contained in portions of this product.<br>
        If you have any questions, please contact<br>&lt;담당메일주소 or 연락처(전화번호)&gt;
      </p>
    </div>
    <kw-separator divider />
    <!-- android opensource start -->
    <template v-if="!isIos">
      <div class="pa20">
        <h2 class="pt0 pb5 mb8">
          License
        </h2>
        <p style="font-size: 14px; color: #777;">
          Apache License 2.0
        </p>
      </div>
      <div
        class="pa20"
      >
        <h2 class="pt0 pb5 mb8">
          Open Source Software
        </h2>
        <ul class="kw-notification">
          <li>Activity</li>
          <li>Android App Startup Runtime</li>
          <li>Android AppCompat Library v7</li>
          <li>Android ConstraintLayout</li>
          <li>Android Lifecycle Process</li>
          <li>Android Lifecycle Runtime</li>
          <li>Android Lifecycle-Common</li>
          <li>Android Resource Inspection Annotations</li>
          <li>Android Support AnimatedVectorDrawable</li>
          <li>Android Support CardView v7</li>
          <li>Android Support Library collections</li>
          <li>Android Support Library Coordinator Layout</li>
          <li>Android Support Library Cursor Adapter</li>
          <li>Android Support Library Custom View - androidx.customview:customview</li>
          <li>Android Support Library Document File</li>
          <li>Android Support Library Drawer Layout</li>
          <li>Android Support Library fragment</li>
          <li>Android Support Library Interpolators</li>
          <li>Android Support Library loader</li>
          <li>Android Support Library Local Broadcast Manager</li>
          <li>Android Support Library Print</li>
          <li>Android Support Library View Pager</li>
          <li>Android Support RecyclerView v7</li>
          <li>Android Support VectorDrawable</li>
          <li>Android Transition Support Library</li>
          <li>android-BluetoothChat</li>
          <li>android.support.dynamicanimation</li>
          <li>AndroidX Annotation</li>
          <li>AndroidX AppCompat</li>
          <li>AndroidX Arch Core</li>
          <li>AndroidX ConstraintLayout</li>
          <li>AndroidX Core</li>
          <li>AndroidX Emoji2</li>
          <li>AndroidX Experimental Annotation</li>
          <li>AndroidX Futures</li>
          <li>AndroidX Legacy</li>
          <li>AndroidX Lifecycle</li>
          <li>AndroidX SavedState</li>
          <li>AndroidX Tracing</li>
          <li>AndroidX ViewPager2</li>
          <li>Apache Commons Codec</li>
          <li>firebase-android-sdk</li>
          <li>Google Android Datatransport</li>
          <li>google-gson</li>
          <li>gradle - gradle/gradle</li>
          <li>Guava ListenableFuture only</li>
          <li>javax.inject:javax.inject</li>
          <li>Material Components for Android - com.google.android.material:material</li>
          <li>VersionedParcelable and friends</li>
          <li>zxing</li>
          <li>zxing-android-embedded</li>
        </ul>
      </div>
      <div class="pa20">
        <h2 class="pt0 pb5 mb8">
          License Text
        </h2>
        <h3>Apache License Version 2.0, January 2004</h3>
        <p style="font-size: 14px; color: #777;">
          http://www.apache.org/licenses/<br>
          TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION<br>
          <ol class="kw-font-pt14 pl17 mb0">
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Definitions.</span><br><br>
              "License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.<br><br>
              "Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.<br><br>
              "Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.<br><br>
              "You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.<br><br>
              "Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.<br><br>
              "Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.<br><br>
              "Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).<br><br>
              "Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.<br><br>
              "Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."<br><br>
              "Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Grant of Copyright License.</span> Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Grant of Patent License.</span> Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Redistribution.</span> You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  You must give any other recipients of the Work or Derivative Works a copy of this License; and
                </li>
                <li class="pb10">
                  You must cause any modified files to carry prominent notices stating that You changed the files; and
                </li>
                <li class="pb10">
                  You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
                </li>
                <li class="pb10">
                  If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.
                </li>
              </ol>
              You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Submission of Contributions.</span> Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Trademarks.</span> This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Disclaimer of Warranty.</span> Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Limitation of Liability.</span> In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Accepting Warranty or Additional Liability.</span> While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.
            </li>
          </ol>
          END OF TERMS AND CONDITIONS<br><br>
        </p>
        <h3>APPENDIX: How to apply the Apache License to your work</h3>
        <p style="font-size: 14px; color: #777; padding-top: 20px;">
          To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information. (Don't include the brackets!) The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same "printed page" as the copyright notice for easier identification within third-party archives.
        </p>
        <p style="font-size: 14px; color: #777; padding: 20px;">
          Copyright [yyyy] [name of copyright owner] Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
        </p>
      </div>
    </template>
    <!-- Android opensource end -->
    <!-- IOS opensource start -->
    <template v-else>
      <div class="pa20">
        <h2 class="pt0 pb5 mb8">
          License
        </h2>
        <p style="font-size: 14px; color: #777;">
          Apache License 2.0
        </p>
        <p
          style="font-size: 14px; color: #777;"
        >
          Apple MIT License
        </p>
        <p
          style="font-size: 14px; color: #777;"
        >
          Creative Commons Attribution No Derivatives 3.0
        </p>
        <p
          style="font-size: 14px; color: #777;"
        >
          MIT License
        </p>
        <p
          style="font-size: 14px; color: #777;"
        >
          zlib License
        </p>
      </div>
      <div
        class="pa20"
      >
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          Open Source Software
          <p style="font-size: 14px; color: #777;">
            &nbsp;Apache License 2.0
          </p>
        </h2>
        <ul class="kw-notification">
          <li>firebase-ios-sdk</li>
          <li>GoogleAppMeasurement</li>
          <li>GoogleDataTransport</li>
          <li>GoogleUtilities</li>
          <li>PromisesObjC</li>
        </ul>
      </div>
      <div class="pa20">
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          License Text
          <p style="font-size: 14px; color: #777;">
            &nbsp;Apache License 2.0
          </p>
        </h2>
        <h3>Apache License Version 2.0, January 2004</h3>
        <p style="font-size: 14px; color: #777;">
          http://www.apache.org/licenses/<br>
          TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION<br>
          <ol class="kw-font-pt14 pl17 mb0">
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Definitions.</span><br><br>
              "License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.<br><br>
              "Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.<br><br>
              "Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.<br><br>
              "You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.<br><br>
              "Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.<br><br>
              "Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.<br><br>
              "Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).<br><br>
              "Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.<br><br>
              "Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."<br><br>
              "Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Grant of Copyright License.</span> Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Grant of Patent License.</span> Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Redistribution.</span> You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  You must give any other recipients of the Work or Derivative Works a copy of this License; and
                </li>
                <li class="pb10">
                  You must cause any modified files to carry prominent notices stating that You changed the files; and
                </li>
                <li class="pb10">
                  You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
                </li>
                <li class="pb10">
                  If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.
                </li>
              </ol>
              You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Submission of Contributions.</span> Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Trademarks.</span> This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Disclaimer of Warranty.</span> Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Limitation of Liability.</span> In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Accepting Warranty or Additional Liability.</span> While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.
            </li>
          </ol>
          END OF TERMS AND CONDITIONS<br><br>
        </p>
        <h3>APPENDIX: How to apply the Apache License to your work</h3>
        <p style="font-size: 14px; color: #777; padding-top: 20px;">
          To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information. (Don't include the brackets!) The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same "printed page" as the copyright notice for easier identification within third-party archives.
        </p>
        <p style="font-size: 14px; color: #777; padding: 20px;">
          Copyright [yyyy] [name of copyright owner] Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
        </p>
      </div>

      <div
        class="pa20"
      >
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          Open Source Software
          <p style="font-size: 14px; color: #777;">
            &nbsp;Apple MIT License
          </p>
        </h2>
        <ul class="kw-notification">
          <li>Apple Reachability</li>
        </ul>
      </div>
      <div class="pa20">
        <h2 class="pt0 pb5 mb8">
          License Text
          <p style="font-size: 14px; color: #777;">
            &nbsp;Apple MIT License
          </p>
        </h2>
        <h1>Disclaimer: IMPORTANT: This Apple software is supplied to you by Apple Computer, Inc.</h1>
        <br>
        <p style="font-size: 14px; color: #777;">
          ("Apple") in consideration of your agreement to the following terms, and your use, installation, modification or redistribution of this Apple software constitutes acceptance of these terms. If you do not agree with these terms, please do not use, install, modify or redistribute this Apple software.<br><br>
          In consideration of your agreement to abide by the following terms, and subject to these terms, Apple grants you a personal, non-exclusive license, under Apple's copyrights in this original Apple software (the "Apple Software"), to use, reproduce, modify and redistribute the Apple Software, with or without modifications, in source and/or binary forms; provided that if you redistribute the Apple Software in its entirety and without modifications, you must retain this notice and the following text and disclaimers in all such redistributions of the Apple Software. Neither the name, trademarks, service marks or logos of Apple Computer, Inc. may be used to endorse or promote products derived from the Apple Software without specific prior written permission from Apple. Except as expressly stated in this notice, no other rights or licenses, express or implied, are granted by Apple herein, including but not limited to any patent rights that may be infringed by your derivative works or by other works in which the Apple Software may be incorporated.<br><br>
          The Apple Software is provided by Apple on an "AS IS" basis. APPLE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS. <br><br>
          IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>
      </div>

      <div
        class="pa20"
      >
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          Open Source Software
          <p style="font-size: 14px; color: #777;">
            &nbsp;Creative Commons Attribution No Derivatives 3.0
          </p>
        </h2>
        <ul class="kw-notification">
          <li>OpenIDFA</li>
        </ul>
      </div>
      <div class="pa20">
        <h2 class="pt0 pb5 mb8">
          License Text
          <p style="font-size: 14px; color: #777;">
            &nbsp;Creative Commons Attribution No Derivatives 3.0
          </p>
        </h2>
        <h1>Attribution-NoDerivs 3.0 Unported</h1>
        <br>
        <p style="font-size: 14px; color: #777;">
          CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL SERVICES. DISTRIBUTION OF THIS LICENSE DOES NOT CREATE AN ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS INFORMATION ON AN "AS-IS" BASIS. CREATIVE COMMONS MAKES NO WARRANTIES REGARDING THE INFORMATION PROVIDED, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM ITS USE. <br><br>
          <b>License</b><br><br>
          THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.<br><br>
          BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND CONDITIONS.<br><br>
          <ol class="kw-font-pt14 pl17 mb0">
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Definitions</span>
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  <b style="color: black;">"Adaptation"</b> means a work based upon the Work, or upon the Work and other pre-existing works, such as a translation, adaptation, derivative work, arrangement of music or other alterations of a literary or artistic work, or phonogram or performance and includes cinematographic adaptations or any other form in which the Work may be recast, transformed, or adapted including in any form recognizably derived from the original, except that a work that constitutes a Collection will not be considered an Adaptation for the purpose of this License. For the avoidance of doubt, where the Work is a musical work, performance or phonogram, the synchronization of the Work in timed-relation with a moving image ("synching") will be considered an Adaptation for the purpose of this License.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Collection"</b> means a collection of literary or artistic works, such as encyclopedias and anthologies, or performances, phonograms or broadcasts, or other works or subject matter other than works listed in Section 1(f) below, which, by reason of the selection and arrangement of their contents, constitute intellectual creations, in which the Work is included in its entirety in unmodified form along with one or more other contributions, each constituting separate and independent works in themselves, which together are assembled into a collective whole. A work that constitutes a Collection will not be considered an Adaptation (as defined above) for the purposes of this License.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Distribute"</b> means to make available to the public the original and copies of the Work through sale or other transfer of ownership.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Licensor"</b> means the individual, individuals, entity or entities that offer(s) the Work under the terms of this License.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Original Author"</b> means, in the case of a literary or artistic work, the individual, individuals, entity or entities who created the Work or if no individual or entity can be identified, the publisher; and in addition (i) in the case of a performance the actors, singers, musicians, dancers, and other persons who act, sing, deliver, declaim, play in, interpret or otherwise perform literary or artistic works or expressions of folklore; (ii) in the case of a phonogram the producer being the person or legal entity who first fixes the sounds of a performance or other sounds; and, (iii) in the case of broadcasts, the organization that transmits the broadcast.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Work"</b> means the literary and/or artistic work offered under the terms of this License including without limitation any production in the literary, scientific and artistic domain, whatever may be the mode or form of its expression including digital form, such as a book, pamphlet and other writing; a lecture, address, sermon or other work of the same nature; a dramatic or dramatico-musical work; a choreographic work or entertainment in dumb show; a musical composition with or without words; a cinematographic work to which are assimilated works expressed by a process analogous to cinematography; a work of drawing, painting, architecture, sculpture, engraving or lithography; a photographic work to which are assimilated works expressed by a process analogous to photography; a work of applied art; an illustration, map, plan, sketch or three-dimensional work relative to geography, topography, architecture or science; a performance; a broadcast; a phonogram; a compilation of data to the extent it is protected as a copyrightable work; or a work performed by a variety or circus performer to the extent it is not otherwise considered a literary or artistic work.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"You"</b> means an individual or entity exercising rights under this License who has not previously violated the terms of this License with respect to the Work, or who has received express permission from the Licensor to exercise rights under this License despite a previous violation.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Publicly Perform"</b> means to perform public recitations of the Work and to communicate to the public those public recitations, by any means or process, including by wire or wireless means or public digital performances; to make available to the public Works in such a way that members of the public may access these Works from a place and at a place individually chosen by them; to perform the Work to the public by any means or process and the communication to the public of the performances of the Work, including by public digital performance; to broadcast and rebroadcast the Work by any means including signs, sounds or images.
                </li>
                <li class="pt10 pb10">
                  <b style="color: black;">"Reproduce"</b> means to make copies of the Work by any means including without limitation by sound or visual recordings and the right of fixation and reproducing fixations of the Work, including storage of a protected performance or phonogram in digital form or other electronic medium.
                </li>
              </ol>
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Fair Dealing Rights</span>
              Nothing in this License is intended to reduce, limit, or restrict any uses free from copyright or rights arising from limitations or exceptions that are provided for in connection with the copyright protection under copyright law or other applicable laws.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">License Grant</span>
              Subject to the terms and conditions of this License, Licensor hereby grants You a worldwide, royalty-free, non-exclusive, perpetual (for the duration of the applicable copyright) license to exercise the rights in the Work as stated below:
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  to Reproduce the Work, to incorporate the Work into one or more Collections, and to Reproduce the Work as incorporated in the Collections; and,
                </li>
                <li class="pt10 pb10">
                  to Distribute and Publicly Perform the Work including as incorporated in Collections.
                </li>
                <li class="pt10 pb10">
                  For the avoidance of doubt:
                  <ol
                    class="kw-font-pt14 pl17"
                    style="list-style-type: lower-roman;"
                  >
                    <li class="pt10 pb10">
                      <b style="color: black;">Non-waivable Compulsory License Schemes.</b> In those jurisdictions in which the right to collect royalties through any statutory or compulsory licensing scheme cannot be waived, the Licensor reserves the exclusive right to collect such royalties for any exercise by You of the rights granted under this License;
                    </li>
                    <li class="pt10 pb10">
                      <b style="color: black;">Waivable Compulsory License Schemes.</b> In those jurisdictions in which the right to collect royalties through any statutory or compulsory licensing scheme can be waived, the Licensor waives the exclusive right to collect such royalties for any exercise by You of the rights granted under this License; and,
                    </li>
                    <li class="pt10 pb10">
                      <b style="color: black;">Voluntary License Schemes.</b> The Licensor waives the right to collect royalties, whether individually or, in the event that the Licensor is a member of a collecting society that administers voluntary licensing schemes, via that society, from any exercise by You of the rights granted under this License.
                    </li>
                  </ol>
                </li>
              </ol>
              The above rights may be exercised in all media and formats whether now known or hereafter devised. The above rights include the right to make such modifications as are technically necessary to exercise the rights in other media and formats, but otherwise you have no rights to make Adaptations. Subject to Section 8(f), all rights not expressly granted by Licensor are hereby reserved.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Restrictions</span>
              The license granted in Section 3 above is expressly made subject to and limited by the following restrictions:
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  You may Distribute or Publicly Perform the Work only under the terms of this License. You must include a copy of, or the Uniform Resource Identifier (URI) for, this License with every copy of the Work You Distribute or Publicly Perform. You may not offer or impose any terms on the Work that restrict the terms of this License or the ability of the recipient of the Work to exercise the rights granted to that recipient under the terms of the License. You may not sublicense the Work. You must keep intact all notices that refer to this License and to the disclaimer of warranties with every copy of the Work You Distribute or Publicly Perform. When You Distribute or Publicly Perform the Work, You may not impose any effective technological measures on the Work that restrict the ability of a recipient of the Work from You to exercise the rights granted to that recipient under the terms of the License. This Section 4(a) applies to the Work as incorporated in a Collection, but this does not require the Collection apart from the Work itself to be made subject to the terms of this License. If You create a Collection, upon notice from any Licensor You must, to the extent practicable, remove from the Collection any credit as required by Section 4(b), as requested.
                </li>
                <li class="pt10 pb10">
                  If You Distribute, or Publicly Perform the Work or Collections, You must, unless a request has been made pursuant to Section 4(a), keep intact all copyright notices for the Work and provide, reasonable to the medium or means You are utilizing: (i) the name of the Original Author (or pseudonym, if applicable) if supplied, and/or if the Original Author and/or Licensor designate another party or parties (e.g., a sponsor institute, publishing entity, journal) for attribution ("Attribution Parties") in Licensor's copyright notice, terms of service or by other reasonable means, the name of such party or parties; (ii) the title of the Work if supplied; (iii) to the extent reasonably practicable, the URI, if any, that Licensor specifies to be associated with the Work, unless such URI does not refer to the copyright notice or licensing information for the Work. The credit required by this Section 4(b) may be implemented in any reasonable manner; provided, however, that in the case of a Collection, at a minimum such credit will appear, if a credit for all contributing authors of the Collection appears, then as part of these credits and in a manner at least as prominent as the credits for the other contributing authors. For the avoidance of doubt, You may only use the credit required by this Section for the purpose of attribution in the manner set out above and, by exercising Your rights under this License, You may not implicitly or explicitly assert or imply any connection with, sponsorship or endorsement by the Original Author, Licensor and/or Attribution Parties, as appropriate, of You or Your use of the Work, without the separate, express prior written permission of the Original Author, Licensor and/or Attribution Parties.
                </li>
                <li class="pt10 pb10">
                  Except as otherwise agreed in writing by the Licensor or as may be otherwise permitted by applicable law, if You Reproduce, Distribute or Publicly Perform the Work either by itself or as part of any Collections, You must not distort, mutilate, modify or take other derogatory action in relation to the Work which would be prejudicial to the Original Author's honor or reputation.
                </li>
              </ol>
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Representations, Warranties and Disclaimer</span>
              UNLESS OTHERWISE MUTUALLY AGREED TO BY THE PARTIES IN WRITING, LICENSOR OFFERS THE WORK AS-IS AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND CONCERNING THE WORK, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, WARRANTIES OF TITLE, MERCHANTIBILITY, FITNESS FOR A PARTICULAR PURPOSE, NONINFRINGEMENT, OR THE ABSENCE OF LATENT OR OTHER DEFECTS, ACCURACY, OR THE PRESENCE OF ABSENCE OF ERRORS, WHETHER OR NOT DISCOVERABLE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO SUCH EXCLUSION MAY NOT APPLY TO YOU.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Limitation on Liability.</span>
              EXCEPT TO THE EXTENT REQUIRED BY APPLICABLE LAW, IN NO EVENT WILL LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY FOR ANY SPECIAL, INCIDENTAL, CONSEQUENTIAL, PUNITIVE OR EXEMPLARY DAMAGES ARISING OUT OF THIS LICENSE OR THE USE OF THE WORK, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </li>
            <li class="pb30">
              <span class="text-weight-bold kw-fc--black1">Termination</span>
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  This License and the rights granted hereunder will terminate automatically upon any breach by You of the terms of this License. Individuals or entities who have received Collections from You under this License, however, will not have their licenses terminated provided such individuals or entities remain in full compliance with those licenses. Sections 1, 2, 5, 6, 7, and 8 will survive any termination of this License.
                </li>
                <li class="pt10 pb10">
                  Subject to the above terms and conditions, the license granted here is perpetual (for the duration of the applicable copyright in the Work). Notwithstanding the above, Licensor reserves the right to release the Work under different license terms or to stop distributing the Work at any time; provided, however that any such election will not serve to withdraw this License (or any other license that has been, or is required to be, granted under the terms of this License), and this License will continue in full force and effect unless terminated as stated above.
                </li>
              </ol>
            </li>
            <li class="pb10">
              <span class="text-weight-bold kw-fc--black1">Miscellaneous</span>
              <ol
                class="kw-font-pt14 pl17"
                style="list-style-type: lower-alpha;"
              >
                <li class="pt10 pb10">
                  Each time You Distribute or Publicly Perform the Work or a Collection, the Licensor offers to the recipient a license to the Work on the same terms and conditions as the license granted to You under this License.
                </li>
                <li class="pt10 pb10">
                  If any provision of this License is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this License, and without further action by the parties to this agreement, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
                </li>
                <li class="pt10 pb10">
                  No term or provision of this License shall be deemed waived and no breach consented to unless such waiver or consent shall be in writing and signed by the party to be charged with such waiver or consent.
                </li>
                <li class="pt10 pb10">
                  This License constitutes the entire agreement between the parties with respect to the Work licensed here. There are no understandings, agreements or representations with respect to the Work not specified here. Licensor shall not be bound by any additional provisions that may appear in any communication from You. This License may not be modified without the mutual written agreement of the Licensor and You.
                </li>
                <li class="pt10 pb10">
                  The rights granted under, and the subject matter referenced, in this License were drafted utilizing the terminology of the Berne Convention for the Protection of Literary and Artistic Works (as amended on September 28, 1979), the Rome Convention of 1961, the WIPO Copyright Treaty of 1996, the WIPO Performances and Phonograms Treaty of 1996 and the Universal Copyright Convention (as revised on July 24, 1971). These rights and subject matter take effect in the relevant jurisdiction in which the License terms are sought to be enforced according to the corresponding provisions of the implementation of those treaty provisions in the applicable national law. If the standard suite of rights granted under applicable copyright law includes additional rights not granted under this License, such additional rights are deemed to be included in the License; this License is not intended to restrict the license of any rights under applicable law.
                </li>
              </ol>
            </li>
          </ol>
        </p>
        <h1>Creative Commons Notice</h1><br><br>
        <p style="font-size: 14px; color: #777;">
          Creative Commons is not a party to this License, and makes no warranty whatsoever in connection with the Work. Creative Commons will not be liable to You or any party on any legal theory for any damages whatsoever, including without limitation any general, special, incidental or consequential damages arising in connection to this license. Notwithstanding the foregoing two (2) sentences, if Creative Commons has expressly identified itself as the Licensor hereunder, it shall have all rights and obligations of Licensor.<br><br>
        </p>
        <p style="font-size: 14px; color: #777;">
          Except for the limited purpose of indicating to the public that the Work is licensed under the CCPL, Creative Commons does not authorize the use by either party of the trademark "Creative Commons" or any related trademark or logo of Creative Commons without the prior written consent of Creative Commons. Any permitted use will be in compliance with Creative Commons' then-current trademark usage guidelines, as may be published on its website or otherwise made available upon request from time to time. For the avoidance of doubt, this trademark restriction does not form part of this License.<br><br>
        </p>
        <p style="font-size: 14px; color: #777;">
          Creative Commons may be contacted at<br>
          <b style="color: black;">http://creativecommons.org/.</b>
        </p>
      </div>

      <div
        class="pa20"
      >
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          Open Source Software
          <p style="font-size: 14px; color: #777;">
            &nbsp;MIT License
          </p>
        </h2>
        <ul class="kw-notification">
          <li>JSONModel</li>
          <li>UIImageUtilities</li>
          <li>WebViewJavascriptBridge</li>
        </ul>
      </div>
      <div class="pa20">
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          License Text
          <p style="font-size: 14px; color: #777;">
            &nbsp;MIT License
          </p>
        </h2>
        <h3>The MIT License</h3>
        <p style="font-size: 16px; color: #777;">
          JSONModel : Copyright (c) 2012-2016 Marin Todorov and JSONModel contributors <br><br>
          UIImageUtilities : Copyright (c) 2015 Daniel Blakemore &lt;dblakemore@pixio.com&gt; <br><br>
          WebViewJavascriptBridge : Copyright (c) 2011-2015 Marcus Westin, Antoine Lagadec <br><br>
        </p>
        <p style="font-size: 14px; color: #777;">
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br><br>
          The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. <br><br>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>

      <div
        class="pa20"
      >
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          Open Source Software
          <p style="font-size: 14px; color: #777;">
            &nbsp;zlib License
          </p>
        </h2>
        <ul class="kw-notification">
          <li>nanopb</li>
        </ul>
      </div>
      <div class="pa20">
        <h2
          class="pt0 pb5 mb8"
          style="display: block;"
        >
          License Text
          <p style="font-size: 14px; color: #777;">
            &nbsp;zlib License
          </p>
        </h2>
        <h3>The zlib/libpng License</h3>
        <p style="font-size: 16px; color: #777;">
          Copyright (c) 2011 Petteri Aimonen &lt;jpa at nanopb.mail.kapsi.fi&gt;<br><br>
        </p>
        <p style="font-size: 14px; color: #777;">
          This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software. <br><br>
          Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
          <ol class="kw-font-pt14 pl17 mb0">
            <li class="pt10 pb10">
              The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
            </li>
            <li class="pt10 pb10">
              Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software
            </li>
            <li class="pt10 pb10">
              This notice may not be removed or altered from any source distribution.
            </li>
          </ol>
        </p>
      </div>
    </template>
  </kw-popup>
</template>

<script setup>
import { platform } from '../../plugins/platform';

const isIos = computed(() => (!platform.is.desktop && (
  platform.is.ios || platform.is.ipad || platform.is.iphone || platform.is.safari)));
</script>
