// Gerekli React hook'ları ve React Native bileşenleri
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Expo kütüphaneleri
import { FontAwesome5 } from '@expo/vector-icons';

// Proje içi sabitler ve servisler
import { tema } from '../sabitler/tema';
import { filmleriGetir } from '../servisler/ghibliServisi';

// Ana Başlangıç Ekranı Bileşeni
export default function BaslangicEkrani() {
  // 1. DURUM (STATE)
  const [filmler, setFilmler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  // 2. VERİYİ ÇEK
  const filmleriYukle = async () => {
    setYukleniyor(true);
    setHata(null);

    try {
      const gelenFilmler = await filmleriGetir();
      setFilmler(gelenFilmler);

      // Gelen verileri ve alan yapısını incelemek için konsola yazdır
      console.log('--- STUDIO GHIBLI API VERİLERİ ---');
      console.log('Toplam film sayısı:', gelenFilmler.length);

      if (gelenFilmler.length > 0) {
        const ilkFilm = gelenFilmler[0];
        const filmAlanlari = Object.keys(ilkFilm);

        console.log('Bir film objesindeki alanlar:', filmAlanlari);
        console.log('Örnek ilk film:', ilkFilm);
      }

      console.log('Tüm filmler listesi:', gelenFilmler);
    } catch (yakalananHata) {
      console.log('API hatası:', yakalananHata);
      setHata('Filmler yüklenemedi. İnternet bağlantınızı kontrol edin.');
    } finally {
      setYukleniyor(false);
    }
  };

  // Ekran ilk açıldığında yalnızca bir kez çalışır ([] bağımlılık dizisi sayesinde)
  useEffect(() => {
    filmleriYukle();
  }, []);

  // 3. EKRAN
  return (
    // SafeAreaView (Çentik vb. için güvenli alan)
    <SafeAreaView style={stiller.kapsayici}>
      <View style={stiller.icerik}>
        {/* Ders Rozeti */}
        <View style={stiller.rozet}>
          <Text style={stiller.rozetMetni}>BSM447 · API Bağlantısı</Text>
        </View>

        {/* Uygulama İkonu */}
        <View style={stiller.ikonKutusu}>
          <FontAwesome5 name="film" style={stiller.ikon} />
        </View>

        {/* Başlık */}
        <View style={stiller.baslikAlani}>
          <Text style={stiller.baslik}>Ghibli Arşivi</Text>
          <Text style={stiller.altBaslik}>
            Studio Ghibli API veri çekme ve konsol inceleme adımı
          </Text>
        </View>

        {/* Durum 1: Yükleniyor */}
        {yukleniyor && (
          <View style={stiller.yukleniyorKutusu}>
            <ActivityIndicator size="large" color={tema.renkler.birincil} />
            <Text style={stiller.durumMetni}>Filmler API'den çekiliyor...</Text>
          </View>
        )}

        {/* Durum 2: Hata Oluştu */}
        {hata && (
          <View style={stiller.hataKutusu}>
            <Text style={stiller.hataMetni}>{hata}</Text>
            <Pressable style={stiller.tekrarButon} onPress={filmleriYukle}>
              <Text style={stiller.tekrarButonMetni}>Tekrar Dene</Text>
            </Pressable>
          </View>
        )}

        {/* Durum 3: Veri Başarıyla Geldi (Henüz liste tasarımı yok) */}
        {!yukleniyor && !hata && (
          <View style={stiller.bilgiKarti}>
            <View style={stiller.bilgiBaslikSatiri}>
              <FontAwesome5 name="check-circle" style={stiller.bilgiIkon} />
              <Text style={stiller.bilgiBaslik}>API Bağlantısı Başarılı</Text>
            </View>

            <Text style={stiller.bilgiMetni}>
              Toplam {filmler.length} film başarıyla çekildi. Gelen veriler ve
              JSON alanları konsola yazdırıldı.
            </Text>

            {filmler.length > 0 && (
              <Text style={stiller.ornekSatir}>
                İlk kayıt: {filmler[0].title} ({filmler[0].release_date})
              </Text>
            )}

            <Pressable style={stiller.yenileButon} onPress={filmleriYukle}>
              <Text style={stiller.yenileButonMetni}>Veriyi Tekrar Çek</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Alt Bilgi */}
      <Text style={stiller.altBilgi}>GhibliArsivi · v1.0.0</Text>
    </SafeAreaView>
  );
}

// 4. STİLLER (StyleSheet)
// Tüm renk, boşluk ve yazı boyutu değerleri 'tema' objesinden geliyor.
const stiller = StyleSheet.create({
  kapsayici: {
    flex: 1,
    backgroundColor: tema.renkler.arkaPlan,
    paddingHorizontal: tema.bosluk.buyuk,
    paddingVertical: tema.bosluk.orta,
    justifyContent: 'space-between',
  },
  icerik: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rozet: {
    backgroundColor: tema.renkler.rozetArkaPlani,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: tema.bosluk.buyuk,
  },
  rozetMetni: {
    color: tema.renkler.birincil,
    fontSize: tema.yaziBoyutu.kucuk,
    fontWeight: '700',
  },
  ikonKutusu: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: tema.renkler.kart,
    borderWidth: 1,
    borderColor: tema.renkler.sinir,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: tema.bosluk.orta,
  },
  ikon: {
    fontSize: 38,
    color: tema.renkler.birincil,
  },
  baslikAlani: {
    marginBottom: tema.bosluk.buyuk,
  },
  baslik: {
    ...tema.ortakMetin,
    fontSize: tema.yaziBoyutu.baslik,
    fontWeight: '700',
    color: tema.renkler.baslikMetni,
    marginBottom: tema.bosluk.kucuk,
  },
  altBaslik: {
    ...tema.ortakMetin,
    fontSize: tema.yaziBoyutu.normal,
    lineHeight: 22,
    color: tema.renkler.altMetin,
  },
  yukleniyorKutusu: {
    alignItems: 'center',
    marginTop: tema.bosluk.orta,
  },
  durumMetni: {
    marginTop: 12,
    fontSize: tema.yaziBoyutu.normal,
    color: tema.renkler.altMetin,
  },
  hataKutusu: {
    width: '100%',
    padding: tema.bosluk.orta,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: tema.renkler.hataArkaPlan,
  },
  hataMetni: {
    ...tema.ortakMetin,
    color: tema.renkler.hataMetin,
    fontSize: tema.yaziBoyutu.normal,
  },
  tekrarButon: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: tema.renkler.hataMetin,
  },
  tekrarButonMetni: {
    color: tema.renkler.beyaz,
    fontWeight: '700',
  },
  bilgiKarti: {
    width: '100%',
    backgroundColor: tema.renkler.kart,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: tema.renkler.sinir,
    padding: tema.bosluk.orta,
  },
  bilgiBaslikSatiri: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bilgiIkon: {
    fontSize: 18,
    color: tema.renkler.birincil,
  },
  bilgiBaslik: {
    fontSize: 16,
    fontWeight: '600',
    color: tema.renkler.baslikMetni,
  },
  bilgiMetni: {
    fontSize: 14,
    lineHeight: 20,
    color: tema.renkler.altMetin,
    marginBottom: 8,
  },
  ornekSatir: {
    fontSize: 13,
    fontWeight: '600',
    color: tema.renkler.birincil,
    marginBottom: 14,
  },
  yenileButon: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: tema.renkler.birincil,
  },
  yenileButonMetni: {
    color: tema.renkler.beyaz,
    fontSize: 13,
    fontWeight: '700',
  },
  altBilgi: {
    ...tema.ortakMetin,
    fontSize: tema.yaziBoyutu.kucuk,
    color: tema.renkler.acikMetin,
  },
});
