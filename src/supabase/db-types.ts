export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type RecordNever = Record<never, never>;

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: {
          artist: string;
          cd: boolean;
          created_at: string;
          favorite: boolean;
          id: number;
          studio: boolean;
          title: string;
          wishlist: boolean;
          year: string;
          artist_title: string | null;
        };
        Insert: {
          artist: string;
          cd?: boolean;
          created_at?: string;
          favorite?: boolean;
          id?: number;
          studio?: boolean;
          title: string;
          wishlist?: boolean;
          year: string;
        };
        Update: {
          artist?: string;
          cd?: boolean;
          created_at?: string;
          favorite?: boolean;
          id?: number;
          studio?: boolean;
          title?: string;
          wishlist?: boolean;
          year?: string;
        };
        Relationships: [];
      };
      rankings: {
        Row: {
          album_id: number;
          all_time_position: number | null;
          created_at: string;
          id: number;
          position: number;
          year: string;
        };
        Insert: {
          album_id: number;
          all_time_position?: number | null;
          created_at?: string;
          id?: number;
          position: number;
          year: string;
        };
        Update: {
          album_id?: number;
          all_time_position?: number | null;
          created_at?: string;
          id?: number;
          position?: number;
          year?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rankings_album_id_fkey';
            columns: ['album_id'];
            isOneToOne: true;
            referencedRelation: 'albums';
            referencedColumns: ['id'];
          },
        ];
      };
      releases: {
        Row: {
          artist: string;
          created_at: string;
          date: string | null;
          id: number;
          title: string;
        };
        Insert: {
          artist: string;
          created_at?: string;
          date?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          artist?: string;
          created_at?: string;
          date?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      songs: {
        Row: {
          artist: string;
          created_at: string;
          id: number;
          link: string;
          title: string;
        };
        Insert: {
          artist: string;
          created_at?: string;
          id?: number;
          link: string;
          title: string;
        };
        Update: {
          artist?: string;
          created_at?: string;
          id?: number;
          link?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: RecordNever;
    Functions: {
      albums_by_year: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      artist_title: {
        Args: { '': Database['public']['Tables']['albums']['Row'] };
        Returns: string;
      };
      get_artists: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      leaderboard: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      search_albums: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
    Enums: RecordNever;
    CompositeTypes: RecordNever;
  };
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
