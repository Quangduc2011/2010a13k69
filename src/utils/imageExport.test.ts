import test from 'node:test';
import assert from 'node:assert/strict';
import { generateExportFileName } from './imageExport.ts';

test('generateExportFileName formats name properly according to requirements', () => {
  assert.equal(
    generateExportFileName('Vũ Phương Anh'),
    'Loi-chuc-2010-Vu-Phuong-Anh.png'
  );
  assert.equal(
    generateExportFileName('Vi Ngọc Minh'),
    'Loi-chuc-2010-Vi-Ngoc-Minh.png'
  );
  assert.equal(
    generateExportFileName('Đinh Thị Kim Bông'),
    'Loi-chuc-2010-Dinh-Thi-Kim-Bong.png'
  );
  assert.equal(
    generateExportFileName('Kha Thị Quỳnh Sương'),
    'Loi-chuc-2010-Kha-Thi-Quynh-Suong.png'
  );
});

test('generateExportFileName handles extra spaces', () => {
  assert.equal(
    generateExportFileName('  la   ánh   dương  '),
    'Loi-chuc-2010-La-Anh-Duong.png'
  );
});
