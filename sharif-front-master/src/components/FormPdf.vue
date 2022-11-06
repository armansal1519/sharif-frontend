<template>
  <div id="app" ref="document">
    <div id="element-to-convert" style="padding: 1.5cm 1cm">
      <div style="width: 100%;height: 100%;border: #808080 3px solid">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <img style="width: 2cm;height: 2cm" src="/logo.png" alt="logo">
          <div style="font-size: 16px;"> فرم تطبيق دروس کارشناسي {{ field }}</div>
          <div style="width: 2cm;height: 2cm"></div>
        </div>
        <div style="display: flex;justify-content: space-between;margin: 0.5cm">
          <div style="display: flex;">
            <div style="">

              <div style="font-size: 12px">نام خانوادگی</div>
              <div style="border: #1d1d1d 1px solid;width: 4.5cm;height: 1cm;display: flex;justify-content: center;align-items: center;font-size: 14px">{{ lastName }}</div>

            </div>
            <div style="">

              <div style="font-size: 12px">نام</div>
              <div style="border: #1d1d1d 1px solid;width: 4.5cm;height: 1cm;display: flex;justify-content: center;align-items: center;font-size: 14px">{{ firstName }}</div>

            </div>
          </div>
          <div style="display: flex">
            <div style="">

              <div style="font-size: 12px">شماره دانشجویی</div>


              <div style="display: flex;flex-direction: row-reverse">
                <div v-for="(v,i) in studentNumber"
                     style="border: #1d1d1d 1px solid;width: 9mm;height: 10mm;display: flex;justify-content: center;align-items: center;font-size: 14px" :key="i">
                  {{ v }}
                </div>
              </div>

            </div>

          </div>

        </div>

        <div style="margin: 0.5cm">
          <div style="font-size: 14px;font-weight: bold">نام و نام خانوادگي استاد راهنما:</div>
          <div style="font-size: 14px;font-weight: bold;margin-top: 12px">اين قسمت توسط استاد راهنما تکميل ميشود.</div>
        </div>

        <div>
          <div style="display: flex;justify-content: center">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">ردیف</div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحد لازم</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحد</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحدهاي گذرانده</div>

          </div>
          <div v-for="(s,i) in formSummery" style="display: flex;justify-content: center" :key="i">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ i +1 }}</div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.group_name }}</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.group_count }}</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.student_count }}</div>

          </div>

          <div style="display: flex;justify-content: center">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px"></div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">کل دروس براي فراغت از تحصيل</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ formSummery.map(item=> item.group_count).reduce((partialSum, a) => partialSum + a, 0) }}</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ formSummery.map(item=> item.student_count).reduce((partialSum, a) => partialSum + a, 0) }}
            </div>

          </div>
        </div>

        <div style="margin: 0.5cm">
          <div style="font-size: 14px;font-weight: bold">
            معدل دانشجو در طول تحصيل
          </div>
          <div style="display: flex;justify-content: center;margin-top: 5mm">
            <div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">سال تحصيلي</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">نیم سال</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">معدل</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">معدل کل</div>

            </div>
            <div  v-for="(v,k,i) in formAvg" :key="i">
              <div style="border: #1d1d1d 1px solid;width: 27mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k}}</div>
              <div style="display: flex">
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"1"}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"2"}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"3"}}</div>

              </div>
              <div style="display: flex">
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_1"]===0?'-':v["t_1"]}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_2"]===0?'-':v["t_2"]}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_3"]===0?'-':v["t_3"]}}</div>

              </div>
              <div style="border-bottom: #1d1d1d 1px solid;width: 27mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px"
                   :style="i===5?{'border-left': '#1d1d1d 1px solid'}:''">
                <div v-if="i===2">
                  {{totalAvg}}
                </div>
              </div>

            </div>

          </div>
        </div>

        <div style="margin: 0.5cm;display: flex;">
          <div style="border: #1d1d1d solid 1px;flex-grow: 1;height: 9cm;padding: 2mm;">
            <div style="display: flex;align-items: baseline">
              <div style="width: 2mm;height: 2mm;border: #1d1d1d solid 1px;margin-left: 2mm"></div> <div style="font-size: 10px">دانشجو تمامي دروس لازم براي فارغ التحصيلي را گذرانده است</div>
            </div>
            <div style="display: flex">
              <div style="width: 2mm;height: 2mm;border: #1d1d1d solid 1px;margin-left: 2mm"></div> <div style="font-size: 10px">دانشجو با گذراندن دروس زير فارغ التحصيل ميشود:</div>
            </div>
            <div v-for="i in 10" :key="i" style="margin-bottom: 2mm;margin-right: 2mm">
              {{i}}.
            </div>

          </div>
          <div style="border: #1d1d1d solid 1px;width: 9cm;height: 9cm">
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء مدير گروه:</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء رئيس دانشکده</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء معاون آموزشي</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
          </div>
        </div>



      </div>
      <div style="margin-top: 2.5cm"></div>
      <div style="width: 100%;height: 100%;border: #808080 3px solid">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <img style="width: 2cm;height: 2cm" src="/logo.png" alt="logo">
          <div style="font-size: 16px;"> فرم تطبيق دروس کارشناسي {{ field }}</div>
          <div style="width: 2cm;height: 2cm"></div>
        </div>
        <div style="display: flex;justify-content: space-between;margin: 0.5cm">
          <div style="display: flex;">
            <div style="">

              <div style="font-size: 12px">نام خانوادگی</div>
              <div style="border: #1d1d1d 1px solid;width: 4.5cm;height: 1cm;display: flex;justify-content: center;align-items: center;font-size: 14px">{{ lastName }}</div>

            </div>
            <div style="">

              <div style="font-size: 12px">نام</div>
              <div style="border: #1d1d1d 1px solid;width: 4.5cm;height: 1cm;display: flex;justify-content: center;align-items: center;font-size: 14px">{{ firstName }}</div>

            </div>
          </div>
          <div style="display: flex">
            <div style="">

              <div style="font-size: 12px">شماره دانشجویی</div>


              <div style="display: flex;flex-direction: row-reverse">
                <div v-for="(v,i) in studentNumber"
                     style="border: #1d1d1d 1px solid;width: 9mm;height: 10mm;display: flex;justify-content: center;align-items: center;font-size: 14px" :key="i">
                  {{ v }}
                </div>
              </div>

            </div>

          </div>

        </div>

        <div style="margin: 0.5cm">
          <div style="font-size: 14px;font-weight: bold">نام و نام خانوادگي استاد راهنما:</div>
          <div style="font-size: 14px;font-weight: bold;margin-top: 12px">اين قسمت توسط استاد راهنما تکميل ميشود.</div>
        </div>

        <div>
          <div style="display: flex;justify-content: center">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">ردیف</div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحد لازم</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحد</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 12px">واحدهاي گذرانده</div>

          </div>
          <div v-for="(s,i) in formSummery" style="display: flex;justify-content: center" :key="i">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ i +1 }}</div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.group_name }}</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.group_count }}</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 7mm;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ s.student_count }}</div>

          </div>

          <div style="display: flex;justify-content: center">
            <div style="border: #1d1d1d 1px solid;width: 1cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px"></div>
            <div style="border: #1d1d1d 1px solid;width: 5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">کل دروس براي فراغت از تحصيل</div>
            <div style="border: #1d1d1d 1px solid;width: 1.5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ formSummery.map(item=> item.group_count).reduce((partialSum, a) => partialSum + a, 0) }}</div>
            <div style="border: #1d1d1d 1px solid;width: 2.5cm;height: 50px;display: flex;justify-content: center;align-items: center;font-size: 10px">
              {{ formSummery.map(item=> item.student_count).reduce((partialSum, a) => partialSum + a, 0) }}
            </div>

          </div>
        </div>

        <div style="margin: 0.5cm">
          <div style="font-size: 14px;font-weight: bold">
            معدل دانشجو در طول تحصيل
          </div>
          <div style="display: flex;justify-content: center;margin-top: 5mm">
            <div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">سال تحصيلي</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">نیم سال</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">معدل</div>
              <div style="border: #1d1d1d 1px solid;width: 2cm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">معدل کل</div>

            </div>
            <div  v-for="(v,k,i) in formAvg" :key="i">
              <div style="border: #1d1d1d 1px solid;width: 27mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k}}</div>
              <div style="display: flex">
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"1"}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"2"}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{k+"3"}}</div>

              </div>
              <div style="display: flex">
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_1"]===0?'-':v["t_1"]}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_2"]===0?'-':v["t_2"]}}</div>
                <div style="border: #1d1d1d 1px solid;width: 9mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px">{{v["t_3"]===0?'-':v["t_3"]}}</div>

              </div>
              <div style="border-bottom: #1d1d1d 1px solid;width: 27mm;height: 6mm;display: flex;justify-content: center;align-items: center;font-size: 10px"
                   :style="i===5?{'border-left': '#1d1d1d 1px solid'}:''">
                <div v-if="i===2">
                  {{totalAvg}}
                </div>
              </div>

            </div>

          </div>
        </div>

        <div style="margin: 0.5cm;display: flex;">
          <div style="border: #1d1d1d solid 1px;flex-grow: 1;height: 9cm;padding: 2mm;">
            <div style="display: flex;align-items: baseline">
              <div style="width: 2mm;height: 2mm;border: #1d1d1d solid 1px;margin-left: 2mm"></div> <div style="font-size: 10px">دانشجو تمامي دروس لازم براي فارغ التحصيلي را گذرانده است</div>
            </div>
            <div style="display: flex">
              <div style="width: 2mm;height: 2mm;border: #1d1d1d solid 1px;margin-left: 2mm"></div> <div style="font-size: 10px">دانشجو با گذراندن دروس زير فارغ التحصيل ميشود:</div>
            </div>
            <div v-for="i in 10" :key="i" style="margin-bottom: 2mm;margin-right: 2mm">
              {{i}}.
            </div>

          </div>
          <div style="border: #1d1d1d solid 1px;width: 9cm;height: 9cm">
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء مدير گروه:</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء رئيس دانشکده</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
            <div style="border-bottom: #1d1d1d solid 1px;flex-grow: 1;height: 3cm;padding: 1mm">
              <div style="font-size: 14px;font-weight: bold">امضاء معاون آموزشي</div>
              <div style="font-size: 14px;font-weight: bold;margin-top: 1.6cm">تاريخ :</div>
            </div>
          </div>
        </div>



      </div>


    </div>
  </div>
  <button @click="exportToPDF">Export to PDF</button>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "FormPdfPage"-->
<!--}-->
<!--</script>-->
<script>

import html2pdf from "html2pdf.js";

export default {
  props: {
    field: String,
    lastName: String,
    firstName: String,
    studentNumber: String,
    formSummery:Object,
    formAvg:Object,
    totalAvg:Number,
  },
  components: {},
  methods: {
    exportToPDF() {

      var element = document.getElementById('element-to-convert');
      var opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2},
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

// New Promise-based usage:
      html2pdf().set(opt).from(element).save();
    },
  },
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}
</style>
