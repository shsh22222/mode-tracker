import { ModeDefinition, ModeId } from './types';
import { 
  Scale, 
  Users, 
  UserMinus, 
  BookOpen, 
  CloudLightning 
} from 'lucide-react';

export const MODES: Record<ModeId, ModeDefinition> = {
  [ModeId.ZERO_100]: {
    id: ModeId.ZERO_100,
    name: 'ゼロヒャクモード',
    alias: '内なる採点官',
    description: '100点以外は全部0点。小さなミスで全てを否定する。',
    color: '#f87171', // Red 400
    icon: 'Scale',
  },
  [ModeId.EXTERNAL_STANDARDS]: {
    id: ModeId.EXTERNAL_STANDARDS,
    name: '他人基準インストール',
    alias: '内なる世間様',
    description: '世間や他人のモノサシだけで自分を測る。',
    color: '#fb923c', // Orange 400
    icon: 'Users',
  },
  [ModeId.ALL_MY_FAULT]: {
    id: ModeId.ALL_MY_FAULT,
    name: '全部オレのせい',
    alias: '内なる謝罪担当',
    description: '関係ない因果まで背負い込み、過剰に自責する。',
    color: '#a78bfa', // Violet 400
    icon: 'UserMinus',
  },
  [ModeId.SELF_DENIAL]: {
    id: ModeId.SELF_DENIAL,
    name: '自己否定ストーリー',
    alias: '内なる暗黒ナレーター',
    description: '出来事を「自分はダメな人間」という物語に回収する。',
    color: '#38bdf8', // Sky 400
    icon: 'BookOpen',
  },
  [ModeId.LIFE_OVER]: {
    id: ModeId.LIFE_OVER,
    name: '人生オワタモード',
    alias: '内なる終末予報',
    description: '未来を最悪のシナリオで確定事項として扱う。',
    color: '#94a3b8', // Slate 400
    icon: 'CloudLightning',
  },
};

export const EMOTIONS = [
  '不安', '憂鬱', '怒り', '恥', '焦り', '虚無', '罪悪感', '孤独'
];

export const CBT_HINTS: Record<ModeId, string> = {
  [ModeId.ZERO_100]: 'ヒント：もし「60点で合格」というルールなら、今の状況はどう見える？',
  [ModeId.EXTERNAL_STANDARDS]: 'ヒント：「他人の期待」を一旦脇に置いて、自分自身はどうしたい？',
  [ModeId.ALL_MY_FAULT]: 'ヒント：自分以外の要因（環境、相手の事情、タイミング）を1つ探すなら？',
  [ModeId.SELF_DENIAL]: 'ヒント：「人間性」全体ではなく、今回の具体的な「行動」だけに焦点を絞ると？',
  [ModeId.LIFE_OVER]: 'ヒント：最悪の結末はまだ確定していない。今この瞬間にできる小さな一歩は？',
};