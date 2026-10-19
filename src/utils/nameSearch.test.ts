import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSpaces, removeVietnameseAccents, searchWishByName } from './nameSearch.ts';
import { WISHES } from '../data/wishes.ts';

test('dataset contains exactly 36 records with unique IDs and non-empty fields', () => {
  assert.equal(WISHES.length, 36, 'Should have exactly 36 girls');
  const ids = new Set(WISHES.map(w => w.id));
  assert.equal(ids.size, 36, 'All 36 IDs must be unique');

  for (const wish of WISHES) {
    assert.ok(wish.name && wish.name.trim().length > 0, `Wish ${wish.id} has invalid name`);
    assert.ok(wish.shortName && wish.shortName.trim().length > 0, `Wish ${wish.id} has invalid shortName`);
    assert.ok(wish.greeting && wish.greeting.trim().length > 20, `Wish ${wish.id} has incomplete greeting`);
    assert.equal(typeof (wish as any).funnyMessage, 'undefined', 'funnyMessage must not exist');
  }
});

test('normalizeSpaces handles trailing, leading, and inner whitespace and casing', () => {
  assert.equal(normalizeSpaces('  vũ   phương anh  '), 'vũ phương anh');
  assert.equal(normalizeSpaces('VŨ PHƯƠNG ANH'), 'vũ phương anh');
  assert.equal(normalizeSpaces(''), '');
});

test('removeVietnameseAccents handles diacritics and d/đ', () => {
  assert.equal(removeVietnameseAccents('Đinh Thị Kim Bông'), 'dinh thi kim bong');
  assert.equal(removeVietnameseAccents('Kha Thị Quỳnh Sương'), 'kha thi quynh suong');
});

test('searchWishByName finds exact full name matches', () => {
  const res1 = searchWishByName('Vũ Phương Anh');
  assert.equal(res1.status, 'found');
  if (res1.status === 'found') {
    assert.equal(res1.wish.id, 1);
    assert.equal(res1.wish.name, 'Vũ Phương Anh');
  }

  const res2 = searchWishByName('Giàng Thị Phương Anh');
  assert.equal(res2.status, 'found');
  if (res2.status === 'found') {
    assert.equal(res2.wish.id, 2);
  }
});

test('searchWishByName finds matches with extra spaces and mixed casing', () => {
  const res = searchWishByName('   đinh   thị   kim   bông   ');
  assert.equal(res.status, 'found');
  if (res.status === 'found') {
    assert.equal(res.wish.id, 3);
  }
});

test('searchWishByName finds matches without accents', () => {
  const res = searchWishByName('dinh thi kim bong');
  assert.equal(res.status, 'found');
  if (res.status === 'found') {
    assert.equal(res.wish.id, 3);
  }
});

test('searchWishByName returns ambiguous for duplicate partial names', () => {
  // "Phương Anh" is present in both Vũ Phương Anh and Giàng Thị Phương Anh
  const res = searchWishByName('Phương Anh');
  assert.equal(res.status, 'ambiguous');
  if (res.status === 'ambiguous') {
    assert.equal(res.candidates.length, 2);
    const names = res.candidates.map(c => c.name);
    assert.ok(names.includes('Vũ Phương Anh'));
    assert.ok(names.includes('Giàng Thị Phương Anh'));
  }
});

test('searchWishByName returns empty message when input is blank', () => {
  const res = searchWishByName('   ');
  assert.equal(res.status, 'empty');
  assert.equal(res.message, 'Cậu chưa nhập tên kìa. Điền họ tên để tìm lời chúc dành riêng cho mình nhé!');
});

test('searchWishByName returns not_found for unlisted names', () => {
  const res = searchWishByName('Nguyễn Văn Nam');
  assert.equal(res.status, 'not_found');
  assert.equal(res.message, 'Hình như tên cậu chưa có trong danh sách. Kiểm tra lại họ tên giúp tớ nhé!');
});
